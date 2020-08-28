import React, { useState} from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Image, Icon, Label, Input, Form, Button, Container, Header} from 'semantic-ui-react';

function AgentQuestions({property, callBackAgent}){
    const [answers, setAnswers] = useState([]);
    const [index, setIndex] = useState(0);

    function nextQuestion(question, choice){
        setAnswers([...answers, {"question": question.question, "answer": choice}])
        setIndex(index + 1);
        if (index + 1 >= JSON.parse(property.questions).length){
          callBackAgent(JSON.parse(JSON.stringify([...answers, {"question": question.question, "answer": choice}])), index +1);
        }
      }
    
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

export default AgentQuestions