import { EntityRepository, Repository} from 'typeorm'

import Appointment from '../models/Appointment';

//2

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> /* 1 */{
    const findAppointment = await this.findOne({
      where: { date: date },
    })

    return findAppointment || null;
  }
}

export default AppointmentsRepository;


/*

  1- SEMPRE QUANDO TEM UMA FUNÇÃO ASSÍNCRONA, O RESULTADO
  DELA É UMA PROMISE DE ALGUM TIPO

  2 - A gente só criou essa class aqui pois nós temos esse
  método próprimo que necessitamos (.findByDate()), porque
  senão, poderiamos utilizar o banco do typeorm direto

*/
