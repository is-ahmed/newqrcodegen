import React, { useState } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Modal, Segment, Input, Form, Button, Dropdown, Label } from 'semantic-ui-react';
import Amplify from 'aws-amplify'
import Predictions, {AmazonAIPredictionsProvider} from '@aws-amplify/predictions'
import awsmobile from './aws-exports.js'
Amplify.addPluggable(new AmazonAIPredictionsProvider());
Amplify.configure(awsmobile)


function GetPropertyInfo({popup, doneHandle, myQuestions, myQuestionLang}) {
  
  const[questionList, setQuestionList] = useState((myQuestionLang[0] !== false) ?  JSON.parse(JSON.stringify(myQuestionLang[0])) : [{'question': '', 'choices': ['', '']}]);
  const[language, setLanguage] = useState('en')
  const[translations, setTranslations] = useState([JSON.parse(JSON.stringify(myQuestionLang[0])), JSON.parse(JSON.stringify(myQuestionLang[1]))])
  const langOptions =[
      {key: 'Choose', text: 'Choose', value: 'Choose'},
      {key: 'English', text: 'English', value: 'English'},
      {key: 'Chinese (Simplified)', text: 'Chinese (Simplified)', value: 'Chinese (Simplified)'}
  ];

  async function handleLangChange(){
    setLanguage((language === 'en') ? 'zh' : 'en')
    const values = JSON.parse(JSON.stringify(questionList))
    for (let i=0; i < values.length; i++){
        let result = await Predictions.convert({
            translateText: {
                source: {
                    text: values[i].question,
                    language: language
                },
                targetLanguage: (language === 'en') ? 'zh' : 'en'
            }
        })
        for (let j=0; j < values[i].choices.length; j++){
            if (values[i].choices[j] !== ''){
                let resultChoice = await Predictions.convert({
                    translateText: {
                        source: {
                            text: values[i].choices[j],
                            language: language
                        },
                        targetLanguage: (language === 'en') ? 'zh' : 'en'
                    }
                })
                values[i].choices[j] = resultChoice.text;
            }
        }
        values[i].question = result.text;
    }
    translations[0] = JSON.parse(JSON.stringify(questionList))
    translations[1] = JSON.parse(JSON.stringify(values));
    setQuestionList(JSON.parse(JSON.stringify(values)))
  }

  async function handleSubmit() {
    for (let i=0; i < questionList.length; i++){
        if (questionList[i].question === ''){
            alert("Please submit a question for question #" + (i + 1));
            return
        }
        
        if (questionList[i].choices.filter(choice => choice !== null && choice !== '').length < 2 && questionList[i].choices.length >= 2){
            alert("Please input 2 or more choices for question #" + (i+ 1))
            return
        }
        
       if (questionList[i].choices.length === 1 && questionList[i].choices[0] ===''){
           alert("You can not have an empty choice if you have only one.")
           return
       }
        questionList[i].choices = questionList[i].choices.filter(choice => choice !== '')
    }
    if (language === 'en') {
        translations[0] = JSON.parse(JSON.stringify(questionList))
    } else {
        translations[1] = JSON.parse(JSON.stringify(questionList))
    }
    doneHandle(JSON.parse(JSON.stringify(translations)));
  }
  
  function handleViewChange(evt){
    if (evt.target.textContent === 'English'){
        setLanguage('en')
        setQuestionList(JSON.parse(JSON.stringify(translations[0])))
    } else if (evt.target.textContent === 'Chinese (Simplified)') {
        setLanguage('zh')
        setQuestionList(JSON.parse(JSON.stringify(translations[1])))
    }
  }

  function addQuestion(){
      const values = [...questionList];
      values.push({'question': '', 'choices': ['', '']})
      setQuestionList(values)
  }

  function deleteQuestion(index){
      const list = [...questionList];
      const list2 = [...list];
      setQuestionList(list.splice(0,index).concat(list2.splice(index+1, questionList.length)))
  }

  function addChoice(index){
    const values=[...questionList];
    values[index].choices.push('');
    setQuestionList(values);
  }

  function handleQuestionChange(index, event){
      const values = [...questionList];
      values[index].question = event.target.value;
      setQuestionList(values);
  }

  function clearInput(){
      const values =[...questionList];
      for (let i=0; i < values.length; i++){
          values[i].question = '';
          for (let j=0; j < values[i].choices.length; j++){
              values[i].choices[j] ='';
          }
      }
      setQuestionList(values);
  }

  return (
    <Modal open={popup}>
        <Modal.Header><a href='https://www.notouchcheckin.ca'>notouchcheckin.ca</a>&nbsp;Agent Questions
            {(language === 'en') ? <Button  onClick={handleLangChange}>Translate to Chinese</Button> : null}
            <Label>View in Language</Label>
            {(translations[1] !== false && translations[1] !== null) ? <Dropdown button basic floating options={langOptions} onChange={(evt) => handleViewChange(evt)} defaultValue='Choose' /> : null }
        </Modal.Header>
        <Modal.Content>
            <Modal.Description>
                <Segment>
                    <Form fluid>
                    {
                        questionList.map((listEntry, index) => (
                            <Question key={`${listEntry}~${index}`} idx={index} question={listEntry} removeMe={deleteQuestion} inputHandle={handleQuestionChange} addQuestion={addQuestion} addChoice={addChoice}/>
                        ))
                    }
                    </Form>
                </Segment>           
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button color='green' onClick={handleSubmit}>
                Next
            </Button>
            <Button type='reset' color='grey' onClick={ () => {clearInput()}}>
                Clear
            </Button>
        </Modal.Actions>
    </Modal>
  
  )
}

function Question({idx, question, removeMe, inputHandle, addQuestion, addChoice}){

    const [choiceList, setChoiceList] = useState(question.choices);
    
    function removeChoice(idx){
        if (question.choices.length > 2){
            const list = [...question.choices];
            const list2 = [...list];
            question.choices =[...list.splice(0,idx).concat(list2.splice(idx+1, question.choices.length))]
            setChoiceList(question.choices);
        } else {
            alert("You must have a minimum of 2 choices.");
            return;
        }
    }

    function countChoices(){
        let count =0;
        for (let i=0; i < question.choices.length; i++){
            if (question.choices[i] !== ''){
                count++;
            }
        }
        return count;
    }

    function callBackToQuestion(){
        setChoiceList([...question.choices])
    }

    return (
        <Segment>
            <Form.Group>
                <Form.Input type='text' value={question.question} style={{width: '500px'}} name='question' placeholder={'Please type Question #' + (idx + 1)} onChange={(event) => {inputHandle(idx, event)}}/>
                {(question.choices.length > 1)
                    ? <Button onClick={() => {removeMe(idx)}} color='red'>-</Button>
                    : null
                }
                {question.question !== '' && countChoices() >= 2 ?  <Button onClick={() => addQuestion()} color='green'>+</Button> : null}
            </Form.Group>
            <hr color='#D3D3D3'/>
            <Form.Group> 
                {
                    question.choices.map((choice, index) => (
                        <Choice key={index} idx={index} choiceList={question.choices} removeMe={removeChoice} callBackToQuestion={callBackToQuestion}/>
                    ))
                }
                {(countChoices() === question.choices.length && question.choices.length > 1)
                    ? <Form.Button onClick={() => addChoice(idx)} style={{position: 'relative', left: '45px'}} color='green' content='+'/>
                    : null
                }
            </Form.Group>
        </Segment>
    )
}

function Choice({ idx, choiceList, removeMe, callBackToQuestion}){
    
    function handleChangeChoice(evt){
        choiceList[idx] = evt.target.value;
        callBackToQuestion();
    }

    return (
     
        <Input
            label={(choiceList[idx] !== '' && choiceList.length > 1) ? <Button color='red' width='25px' onClick={() => removeMe(idx)}>-</Button>: null}
            labelPosition='right'
            type='text' 
            value={choiceList[idx]} 
            style={(choiceList.length > 1) 
                ? {width: "100px", marginRight: '35px', position: 'relative', left: '50px'}
                : {width: "455px", position: 'relative', left: '50px'}
            } 
            name='choice' 
            placeholder={'Choice#' + (idx + 1)} 
            onChange={handleChangeChoice}
        >      
        </Input>
    )
}


export default GetPropertyInfo
// export default withAuthenticator(Client, true);
