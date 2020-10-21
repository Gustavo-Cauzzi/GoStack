import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm'

import AppError from '../errors/AppError';

interface RequestDTO{
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ provider_id, date}: RequestDTO): Promise<Appointment> /* 2 */{
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate){
      throw new AppError('This date is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate
    });

    await appointmentsRepository.save(appointment);//1

    return appointment;
  }
}

export default CreateAppointmentService;

/*

  1 - Na linha 25, apenas é criado a instância lá dentro
  do typeorm, então, para que consiguamos realmente inserir
  essa instância no banco, temos que executar um .save()
  passando por parametro a instancia. (tem que ser assíncrona,
  pois é uma promise)

  2 - SEMPRE QUANDO TEM UMA FUNÇÃO ASSÍNCRONA, O RESULTADO
  DELA É UMA PROMISE DE ALGUM TIPO
*/
