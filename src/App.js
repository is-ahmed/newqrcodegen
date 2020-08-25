import React from 'react';
import AddProperty from "./AddProperty";
import Client from "./Client"



const App = () => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get('id')
  const owner = params.get('owner');

  if (id === null){
    return <AddProperty/>
  }
  
  return <Client agent={owner} id={id}/>
}

export default App;
