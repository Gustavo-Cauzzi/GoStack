import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'
import authConfig from '../config/auth'; //2

import AppError from '../errors/AppError';
import User from '../models/User';

interface RequestDTO{
  email: string;
  password: string;
}

interface ResponseDTO{
  user: User,
  token: string
}

export default class AuthanticateUserService{
  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO>{
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(
      {where: { email: email } }
    );

    if(!user){
      throw new AppError("Incorrect email/password combination", 401); // 3
    }

    // user.password = Senha Criptografada
    // password = Senha não-criptgrafada (tentando fazer login)

    const passwordMatched = await compare(password, user.password); //1

    if(!passwordMatched){
      throw new AppError("Incorrect email/password combination", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({  }, secret, {
      subject: user.id,
      expiresIn: expiresIn,
    });

    return {
      user,
      token
    }
  }
}
/*

  1 - compare() =
    Função do bcryptjs que tem a possibilidade
    de comparar uma senha criptgrafada
    com uma não criptografada.
    (RETORNA UM BOOLEAN
      true - Bateu
      false - Não Bateu
    )

  2 - authConfig é um arquivo (auth.ts) que guarda umas
  informações que precisamos sobre o token, pelo fato que
  iremos precisar desses dados em mais de um lugar, é interes-
  sante deixa-los de acesso à todos

  3 - AppError = classe de erro própria (pasta /errors/AppError)


  yarn add jsonwebtoken
  yarn add -D @types/jsonwebtoken
*/
