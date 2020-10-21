import React , {useEffect, useState} from 'react';
import { SafeAreaView, StatusBar, FlatList, 
Text, StyleSheet, TouchableOpacity} from 'react-native';

import api from './services/api.js';

export default function App(){
  const [projects,setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(res => {
      console.log(res.data);
      setProjects(res.data);
    })
  } , []);

  async function handleAddProject(){
    const res = await api.post("projects",{
      title:`Novo Projeto ${Date.now()}`,
      owner:'Gustavo Cauzzi'
    });

    const proj = res.data;
    
    setProjects([...projects, proj]);
  }

  return (
    <>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor="#7159C1"
      />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={proj => proj.id}
          renderItem={({ item : project}) => (
            <Text style={styles.project}> 
              {project.title} 
            </Text>
          )}
        />
        <TouchableOpacity 
          activeOpacity={0.6} 
          style={styles.button}
          onPress={handleAddProject}
        >
          <Text style={styles.buttonText}>
            Adicionar Projeto
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:"#7159c1",
    flex:1,
  },

  project:{
    color:"#FFF",
    fontSize:20,
  },

  button:{
    backgroundColor:"#fff",
    margin:20,
    height: 50,
    borderRadius: 4,
    justifyContent:"center",
    alignItems:'center'
  },

  buttonText:{
    fontWeight:'bold',
    fontSize:16,
  }
})