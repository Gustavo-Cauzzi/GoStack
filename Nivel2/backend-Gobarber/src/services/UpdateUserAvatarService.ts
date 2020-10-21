import { getRepository } from 'typeorm'
import path from 'path';
import fs from 'fs'; // File System (node)

import AppError from '../errors/AppError';
import User from '../models/User';
import uploadConfig from '../config/upload';

interface RequestDTO{
  user_id: string,
  avatarFileName: string,
}


export default class UpdateUserAvatarService{
  public async execute({ user_id, avatarFileName }: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id)

    if(!user){
      throw new AppError('Only authenticated can change avatar', 401);
    }

    if(user.avatar){ //then {Deletar...}
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)// 1
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath) // 2

      if(userAvatarFileExists){
        await fs.promises.unlink(userAvatarFilePath); // 3
      }
    }

    user.avatar = avatarFileName;

    await usersRepository.save(user);

    return user;
  }
}

/*

  1 - path.join() = juntar dois caminhos para
  formar apenas um

  2 - Checar se o arquivo existe com o File System (fs) do node.
    -> A função stat() retorna um undefined caso ele não exista
    -> O ".promises" serve para executarmos em formato de pro-
    mise do js para podermos usar o await ao envés de usar
    um callback.

  3 - .unlink() deleta um arquivo do File System (fs)
 */
