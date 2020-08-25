import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Image, Icon, Label, Input, Form, Button, Container, Header} from 'semantic-ui-react';

import Amplify from 'aws-amplify';
import {API,graphqlOperation} from 'aws-amplify';
import { createCheckin } from "./graphql/mutations";
import { getProperty } from "./graphql/queries";

import '@aws-amplify/ui/dist/style.css';

import awsmobile from './aws-exports';
import { findByLabelText } from '@testing-library/react';

Amplify.configure(awsmobile);


function Client(props) {

  const [finish, setFinish] = useState(false);
  const [property, setProperty] = useState(null);
  const [index, setIndex] = useState(0);
  const [inputCheckin, setInput] = useState({})
  const [answers, setAnswers] = useState([]);
  
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

  function nextQuestion(question, choice){
    setAnswers([...answers, {"question": question.question, "answer": choice}])
    setIndex(index + 1);
    if (index + 1 >= JSON.parse(property.questions).length){
      console.log('a')
      inputToCheckin();
    }
  }
  

  if (property === null) {
    return (<>Loading ...</>)
  }
  

  if (finish && index === JSON.parse(property.questions).length) {

    // getBuyers();

    // alert(property.picture1);

    return (
      <Container>
          <Header style={{'height': '75px'}} as='h1' size='massive' textAlign='center'>
            <Header.Content></Header.Content>
          </Header>
          <Image
              centered
              size='small'
              src={property.picture1}
          />
          <Header as='h1' textAlign='center'>
            <Header.Content>Thank You!</Header.Content>
          </Header>
          
        </Container>
    )
    // 点击此处获取物业信息
    /*
    <Label size='massive' color='blue'>
            <a href="https://www.realtor.ca/real-estate/21470279/30-citation-dr-toronto-bayview-village">Tap Here For Property Info</a>
        </Label>
    */
  } else if (finish && index !== JSON.parse(property.questions).length) {
      return (
        <Container>
            <Header style={{'height': '75px'}} as='h1' size='massive' textAlign='center'>
              <Header.Content>{property.title}</Header.Content>
            </Header>
            <Image
                centered
                size='small'
                src={property.picture1}
            />
            <Question question={JSON.parse(property.questions)[index]} nextQuestion={nextQuestion}/>
        </Container>
      )
  }
  async function inputToCheckin(){
    inputCheckin.variables.answers = JSON.stringify(answers);
    try {
      await API.graphql(inputCheckin)
    } catch (err) {
      alert("failed to add " + JSON.stringify(err))
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    
    const data = new FormData(event.target);

    if (data.get('email') === '' || data.get('first') === '' || data.get('last') === '' || data.get('tel') === '') {
      alert("Please enter all fields");
      return;
    }
    setInput({
      query: createCheckin,
      operationName: "createCheckin",
      variables: {input: {
        email: data.get('email'),
        firstName: data.get('first'),
        lastName: data.get('last'),
        phone: data.get('tel'),
        owner: props.agent,
        propertyID: props.id,
        propertyAddress: property.address,
        star: false,
        notes: null,
        answers: null
      }},
      authMode: "AWS_IAM",        
    })
    /*
    for (var [key, value] of data.entries()) {
      alert('key: ' + key + ' value: ' + value);
  }
  */

  /*
    try {
      await API.graphql({
        query: createCheckin,
        operationName: "createCheckin",
        variables: {input: {
          email: data.get('email'),
          firstName: data.get('first'),
          lastName: data.get('last'),
          phone: data.get('tel'),
          owner: props.agent,
          propertyID: props.id,
          propertyAddress: property.address,
          star: false,
          notes: null,
        }},
        authMode: "AWS_IAM",        
      })} catch (err) {
        alert("failed to add " + JSON.stringify(err));
      }
    */
    /*
    try {
      await API.graphql(graphqlOperation(createCheckin, { input: { 
        email: data.get('email'),
        firstName: data.get('first'),
        lastName: data.get('last'),
        phone: data.get('tel'),
        agentID: props.agent,
        }}));
    } catch (err) {
      alert("failed to add " + JSON.stringify(err));
    }
    */ 
  
    // alert(data.get('email'));
    setFinish(true)
  }

  
  return (
  <Container>
    <Header as='h2' icon textAlign='center'>
      <Header.Content>Welcome To {property.address}</Header.Content>
      <Button>Translate to Chinese (Simplified)</Button>
    </Header>
    <Image
      centered
      size='small'
      src={property.picture0}
    />
    <Form onSubmit={handleSubmit} fluid>
      <Form.Field required>
      <Form.Field required >
        <label>Surname</label>
        <Input name='last' placeholder='Enter Your Surname' />
      </Form.Field>
        <label>Given Name</label>
        <Input name='first' placeholder='Enter Your Given Name' />
      </Form.Field>
      <Form.Field required>
        <label>Email</label>
        <Input name='email' type='email' placeholder='Enter Your Email' />
      </Form.Field>
      <Form.Field required>
        <label>Telephone</label>
        <Input name='tel' type='tel' placeholder='Enter Your Telephone' />
      </Form.Field>
    
      <Button type='submit'>Submit</Button>
    </Form>
  
  </Container>
  )
}

function Question ({question, nextQuestion}){

  return (
    <Form style={{textAlign: 'center'}}>
      <Form.Field style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
        <label>{question.question}</label>
        {question.choices.map(choice => <Button style={{marginTop: '1em'}} onClick={() => nextQuestion(question, choice)}>{choice}</Button>)}
      </Form.Field>
    </Form>
  )
}


export default Client
// export default withAuthenticator(Client, true);
