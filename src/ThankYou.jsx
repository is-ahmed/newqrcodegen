import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Image, Icon, Label, Input, Form, Button, Container, Header} from 'semantic-ui-react';

function ThankYou({property, language}){
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
              <Header.Content>{(language === 'en') ? JSON.parse(property.questions)[0][1].question : JSON.parse(property.questions)[1][1].question} </Header.Content>
            </Header>
            
          </Container>
      )
}

export default ThankYou;