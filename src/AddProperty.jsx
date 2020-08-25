import React, { useState, useEffect }  from 'react';

import 'semantic-ui-css/semantic.min.css';
import { Container } from 'semantic-ui-react';

import EditSign from './EditSign';
import CreateSign from './CreateSign';
import GetQuestions from './GetQuestions';

import {withAuthenticator} from '@aws-amplify/ui-react'
import {API, graphqlOperation} from 'aws-amplify'
import {createProperty} from './graphql/mutations.js'

function AddProperty() {

    const [popup, setPopup] = useState(true);

    const [property, _] = useState(
    {
        businessName: '',
        address: '',
        scanText: 'Scan To Check In',
        url: '',
        bottomText: '',
    });

    async function doneHandle(questionList){
        setPopup(false);
        alert(JSON.stringify(questionList))
        const inputQuestions = {
            title: questionList[0].question,
            inputText: JSON.stringify(questionList[1]),
            questions: JSON.stringify(questionList.slice(2))
        }
        try {
            await API.graphql(graphqlOperation(createProperty, {input: inputQuestions}))
        } catch (err) {
            console.log('error creating questions:', err)
        }
    }

    
    return (
    <Container>
        <CreateSign property={property} doneHandle={() => setPopup(true)} />
        <EditSign property={property} />
        <GetQuestions popup={popup} doneHandle={doneHandle} myQuestions={[]} myQuestionLang={[[{"question":"Test Title","choices":[]},{"question":"Surname","choices":['Enter your surname']},  {"question":"Do you have any agent?","choices":['yes', 'no']}],null]}/>
    </Container>
    )
}
    
export default withAuthenticator(AddProperty)
