import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Image, Icon, Label, Input, Form, Button, Container, Header} from 'semantic-ui-react';

function ThankYou(property){
    
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
}

export default ThankYou;