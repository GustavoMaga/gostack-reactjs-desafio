import React, {useState, useEffect} from "react";

import "./styles.css";
import api from './services/api'

function App() {

  const [repositories, setRepositories] = useState([])

  async function handleAddRepository() {
    
    const response = await api.post("/repositories",{
      title: 'Novo projeto '+Date.now(),
      url:'http://novoprojeto.js',
      techs:'NodeJs'
    })

    setRepositories([...repositories, response.data])
    
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete('/repositories/'+id)
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  useEffect(()=>{
    api.get('/repositories').then(response=>{
      if(response.data.error == undefined){
        setRepositories(response.data)
      }else{
        setRepositories([response.data])
        console.log(repositories)
      }
    })
  },[])

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repositories=>
                <li key={repositories.id}>
                {repositories.title}
                <button onClick={() => handleRemoveRepository(repositories.id)}>
                  Remover
                </button>
              </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
