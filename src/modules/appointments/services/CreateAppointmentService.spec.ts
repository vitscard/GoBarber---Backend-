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
    const appointment = await createAppoinment.execute({
      date: new Date(),
      provider_id: '123456789',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456789');
  });

  it('should not be able to creatte two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 5, 10, 11);

    await createAppoinment.execute({
      date: appointmentDate,
      provider_id: '123456789',
    });

    await expect(
      createAppoinment.execute({
        date: appointmentDate,
        provider_id: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
