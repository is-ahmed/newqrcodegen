import React, { useState} from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Image, Icon, Label, Input, Form, Button, Container, Header} from 'semantic-ui-react';

function AgentQuestions({property, callBackAgent, language, callBackTranslate}){
    const [answers, setAnswers] = useState([]);
    const [index, setIndex] = useState(0);

    const [questionsAgent, setQuestions] = useState((language === 'en') ? JSON.parse(property.questions)[0].slice(8) : JSON.parse(property.questions)[1].slice(8))
    const [title, setTitle] = useState((language === 'en') ? JSON.parse(property.questions)[0][0].question : JSON.parse(property.questions)[1][0].question)
    const [trnslteLbl, setTrnslteLabel] = useState((language === 'en') ? JSON.parse(property.questions)[0][2].question : JSON.parse(property.questions)[1][2].question )
    function nextQuestion(question, choice){
        if (index + 1 >= questionsAgent.length){
          callBackAgent(JSON.parse(JSON.stringify([...answers, {"question": question.question, "answer": choice}])), index +1);
        } else {
          setAnswers([...answers, {"question": question.question, "answer": choice}])
          setIndex(index + 1);
        }
      }
    
    function translateQuestions(){
      if (language === 'en'){
        setQuestions(JSON.parse(property.questions)[1].slice(8))
        setTitle(JSON.parse(property.questions)[1][0].question)
        setTrnslteLabel(JSON.parse(property.questions)[1][2].question)
      } else {
        setQuestions(JSON.parse(property.questions)[0].slice(8))
        setTitle(JSON.parse(property.questions)[0][0].question)
        setTrnslteLabel(JSON.parse(property.questions)[0][2].question)
      }
      callBackTranslate();
    }
    return (
        <Container>
        <Header as='h2' icon textAlign='center'>
          <Header.Content>{title} {property.address}</Header.Content>
          {(JSON.parse(property.questions)[1] !== null) ? <Button onClick={translateQuestions}>{trnslteLbl}</Button> : null}
        </Header>
        <Image
            centered
            size='small'
            src={property.picture1}
        />
        <Question question={questionsAgent[index]} nextQuestion={nextQuestion}/>
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