import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Image, Icon, Label, Input, Form, Button, Container, Header} from 'semantic-ui-react';
import {createCheckin} from './graphql/mutations.js'

function ClientQuestions({props, property, callBackClient}){

    function handleSubmit(event) {
        event.preventDefault();
        
        const data = new FormData(event.target);

        if (data.get('email') === '' || data.get('first') === '' || data.get('last') === '' || data.get('tel') === '') {
        alert("Please enter all fields");
        return;
        }
        let apiInput = ({
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
        callBackClient(apiInput)
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
export default ClientQuestions;