import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

let fakeAppointmentRepository: FakeAppointmentRepository;
let createAppoinment: CreateAppointmentService;

describe('CreateAppoinment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    createAppoinment = new CreateAppointmentService(fakeAppointmentRepository);
  });

  it('should be able to creatte a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppoinment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: '123123',
      provider_id: '123456789',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456789');
  });

  it('should not be able to creatte two appointments on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 6, 10, 8).getTime();
    });

    const appointmentDate = new Date(2020, 6, 10, 11);

    await createAppoinment.execute({
      date: appointmentDate,
      user_id: '123123',
      provider_id: '123456789',
    });

    await expect(
      createAppoinment.execute({
        date: appointmentDate,
        user_id: '123123',
        provider_id: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to creatte an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppoinment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: '123123',
        provider_id: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to creatte an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppoinment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: '123123',
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to creatte an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppoinment.execute({
        date: new Date(2020, 4, 11, 7),
        user_id: '123123',
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppoinment.execute({
        date: new Date(2020, 4, 11, 18),
        user_id: '123123',
        provider_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
