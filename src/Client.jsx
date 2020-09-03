import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';


import Amplify from 'aws-amplify';
import {API,graphqlOperation} from 'aws-amplify';

import { getProperty } from "./graphql/queries";

import '@aws-amplify/ui/dist/style.css';

import awsmobile from './aws-exports';


import ClientQuestions from './ClientQuestions.jsx'
import AgentQuestions from './AgentQuestions.jsx'
import ThankYou from './ThankYou.jsx'
Amplify.configure(awsmobile);


function Client(props) {

  const [finish, setFinish] = useState(false);
  const [property, setProperty] = useState(null);
  const [index, setIndex] = useState(0);
  const [inputCheckin, setInput] = useState({})
  const [language, setLanguage] = useState('en')

  
  useEffect(() => {

    // API.graphql(graphqlOperation(getProperty, { id: props.id }))
    API.graphql({
        query: getProperty,
        variables: { id: props.id},
        authMode: "AWS_IAM"
      })
    .then(pr => setProperty(pr.data.getProperty))
    .catch(err => alert(props.id + "getproperty error: " + JSON.stringify(err)))


  }, [] )


  if (property === null) {
    return (<>Loading ...</>)
  }
  

  if (finish && index === JSON.parse(property.questions)[0].slice(8).length) {
    return (
      <ThankYou property={property} language={language}/>
    )

  } else if (finish && index !== JSON.parse(property.questions)[0].slice(8).length) {
      return (
        <AgentQuestions property={property} callBackAgent={callBackAgent} language={language} callBackTranslate={callBackTranslate}/>
      )
  }
  async function callBackAgent(inputAnswers, inputIndex){
    setIndex(inputIndex);
    inputCheckin.variables.input.answers = JSON.stringify(inputAnswers);
    try {
      await API.graphql(inputCheckin)
    } catch (err) {
      alert("failed to add " + JSON.stringify(err))
    }
  }

  function callBackClient(inputData){
      setFinish(true);
      setInput(inputData);
  }

  function callBackTranslate(){
    if (language === 'en'){
      setLanguage('zh')
    } else {
      setLanguage('en')
    }
  }

  return (
    <ClientQuestions props={props} property={property} callBackClient={callBackClient} language={language} callBackTranslate={callBackTranslate}/>
  )
}



export default Client
// export default withAuthenticator(Client, true);
