import React, {useState, useEffect} from 'react';

import './App.css';

import api from './services/api';
import Header from './components/Header';

function App(){
  const [projects, setProjects] = useState(['App1','App2']);

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data);
    })
  }, [])

  async function handleAddProject(){
    // // setProjects([...projects,`Novo projeto ${Date.now()}`]);
    const res = await api.post("projects",{
      title:`Novo projeto ${Date.now()}`,
      owner:"Gustavo Cauzzi"
    });

    const proj = res.data;

    setProjects([ ...projects, proj ]);
  }

  return (
    <>
      <Header title="Projects"/>

      <ul>
        {projects.map(project => <li key={project.id}> {project.title} </li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar</button>
    </>
  );
}

export default App;