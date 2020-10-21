import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import CreateUserService from '../services/CreateUserService'
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UploadUserAvatarService from '../services/UpdateUserAvatarService'

const usersRouter = Router();
const upload = multer(uploadConfig)

usersRouter.post('/', async (request,response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({name, email, password});

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UploadUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user)
  }
)//2

export default usersRouter;

/*

  1 - .find()  é tipo um select do typeorm. Dentro
  dele da pra passar um { where: { ... } }

  2- patch - atualizar só um informmaçãozinha
  (tipo o put, mas menor)


  yarn add multer  ->> Upload de arquivo
*/
