import {getRepository } from 'typeorm';
import User from '../models/User';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

interface RequestDTO{
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService{
  public async execute({ name, email, password}: RequestDTO): Promise<User> {
    const usersRepository = getRepository(User);

    const checkUserExists = await usersRepository.findOne({
      where: {email : email}
    });

    if(checkUserExists){
      throw new AppError('Email already used');
    }

    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword
    });

    await usersRepository.save(user);

    delete user.password;

    return user;
  }
}
