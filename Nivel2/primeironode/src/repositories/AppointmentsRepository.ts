import Appointment from '../models/Appointment';
import {isEqual} from 'date-fns';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor(){
    this.appointments = [];
  }

  public findByDate(date: Date): Appointment | null{
    const findAppointment = this.appointments.find(appo =>
      isEqual(date, appo.date)
    );

    return findAppointment || null;
  }

  public create({provider, date}: CreateAppointmentDTO): Appointment{
    const appointment = new Appointment({
      provider,
      date
    });

    this.appointments.push(appointment);

    return appointment;
  }

  public all(): Appointment[]{
    return this.appointments;
  }
}

export default AppointmentsRepository;
