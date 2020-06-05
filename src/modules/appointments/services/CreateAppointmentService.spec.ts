import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

describe('CreateAppoinment', () => {
  it('should be able to creatte a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppoinment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const appointment = await createAppoinment.execute({
      date: new Date(),
      provider_id: '123456789',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456789');
  });

  it('should not be able to creatte two appointments on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppoinment = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

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
