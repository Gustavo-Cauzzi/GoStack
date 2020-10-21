import React from 'react';

import { Title, Form, Repositories } from './styles';
import logo from '../../assets/github-explorer-logo.svg';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logo} alt="Github Explorer"/>
      <Title>Explore repositórios do GitHub</Title>

      <Form>
        <input placeholder="Digite o nome do repositório"/>
        <button> Pesquisar </button>
      </Form>

      <Repositories>
        <a href="">
          <img
            src="https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4"
            alt="Diego Fernandes"
          />
        </a>
      </Repositories>
    </>
  )
}

export default Dashboard;
