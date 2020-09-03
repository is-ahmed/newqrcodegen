import React, {useState} from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Image, Icon, Label, Input, Form, Button, Container, Header} from 'semantic-ui-react';
import {createCheckin} from './graphql/mutations.js'

function ClientQuestions({props, property, callBackClient, language, callBackTranslate}){
    const [questionsClient, setQuestions] = useState(JSON.parse(property.questions)[0].slice(4,8))
    const [title, setTitle] = useState(JSON.parse(property.questions)[0][0].question)
    const [trnslteLbl, setTrnslteLabel] = useState(JSON.parse(property.questions)[0][2].question)
    const [sbmitLbl, setSbmitLabel] = useState(JSON.parse(property.questions)[0][3].question)
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

  function translateForm(){
    if (language === 'en' ){
      setQuestions(JSON.parse(property.questions)[1].slice(4,8))
      setTitle(JSON.parse(property.questions)[1][0].question)
      setTrnslteLabel(JSON.parse(property.questions)[1][2].question)
      setSbmitLabel(JSON.parse(property.questions)[1][3].question)
    } else {
      setQuestions(JSON.parse(property.questions)[0].slice(4,8))
      setTitle(JSON.parse(property.questions)[0][0].question)
      setTrnslteLabel(JSON.parse(property.questions)[0][2].question)
      setSbmitLabel(JSON.parse(property.questions)[0][3].question)

    }
    callBackTranslate()
  }
    
    return (
    <Container>
    <Header as='h2' icon textAlign='center'>
      <Header.Content>{title} {property.address}</Header.Content>
    {(JSON.parse(property.questions)[1] !== null) ? <Button onClick={translateForm}>{trnslteLbl}</Button> : null}
    </Header>
    <Image
      centered
      size='small'
      src={property.picture0}
    />
    <Form onSubmit={handleSubmit} fluid>
      <Form.Field required>
      
      {
        questionsClient.map((question) =>(
          <Form.Field required>
          <label>{question.question}</label>
          <Input name='tel' type='tel' placeholder={question.choices[0]} />
          </Form.Field>
        ))
      }
      </Form.Field>
    <Button type='submit'>{sbmitLbl}</Button>
    </Form>
  
  </Container>
    )
}
export default ClientQuestions;