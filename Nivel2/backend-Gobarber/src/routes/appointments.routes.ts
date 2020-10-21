import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm'

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated); //Nosso middleware

appointmentsRouter.post('/', async (request,response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  console.log("porvider_id: "+provider_id);
  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate
  });

  return response.json(appointment);
});

appointmentsRouter.get('/',async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find() /* 1 */;

  return response.status(200).json(appointments);
})

export default appointmentsRouter;

/*

  1 - .find()  é tipo um select do typeorm. Dentro
  dele da pra passar um { where: { ... } }


  yarn add bcyrptjs
  yarn add -D @types/bcryptjs
*/

