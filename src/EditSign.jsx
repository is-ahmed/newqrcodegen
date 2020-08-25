import React, { useState, useEffect }  from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Grid, Image, Segment } from 'semantic-ui-react';

import noticePic from "./public health notice.png";


var QRCodeGen = require('qrcode');


export default function EditSign({property}) {

    // alert("editsign " + JSON.stringify(property))

    const [updateInput, setUpdateInput] = useState(false);
    const [qrImage, setqrImage] = useState('');

    async function getBase64() {
        if (property.url === '') {
            return;
        }
        const qrurl = await QRCodeGen.toDataURL(property.url);
        setqrImage(qrurl);
    }

    
    useEffect(() => {
        getBase64();
    })

    const wide = '80%'; // tablet use 100%
    
    return (
<div style={{'background-color':'dimgray'}} id='mypage' >

    <div style={{float: 'left'}}>
  
      <input placeholder='Enter Business Name Here' value={property.businessName} size='200'
                onChange={(e) => {property.businessName = e.target.value; setUpdateInput(!updateInput)}}
                style={{...inputStyle, ...{color:'white', width:'50%', height:'5vh', 'font-size': ''}}}/>
      <input placeholder='Enter Address Here' value={property.address} size='200'
                onChange={(e) => {property.address = e.target.value; setUpdateInput(!updateInput)}}
                style={{...inputStyle, ...{color:'white', width:'50%', height:'5vh', 'font-size': ''}}}/>
    </div>
    
  
  <input placeholder='Scan To Check In' value={property.scanText}
                onChange={(e) => {property.scanText = e.target.value; setUpdateInput(!updateInput)}}
                style={{...inputStyle, ...{color:'white'}}}/>

  <Grid>
    <Grid.Row>
      <Grid.Column width={6}>
        <Segment style={{'height':'62vh', width:'100%', 'background-color':'transparent', 'border-style': 'none' }}>
            <Image ui centered image src={noticePic} 
                    style={{'max-height': '100%', 'height': '100%', 'width': '100%', 'max-width': '100%'}}
            />

        </Segment>
      </Grid.Column>
      <Grid.Column width={10}>
        <Segment style={{'height':'62vh', 'background-color':'dimgray', 'border-style': 'none'}} >

            <Image ui centered image src={qrImage} style={{'max-height': '100%', 'height': '100%', 'width': wide, 'max-width': wide}}/>
            
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>

  <input value={property.bottomText}
                onChange={(e) => {
                    property.bottomText = e.target.value
                    setUpdateInput(!updateInput)}
                }
                style={{...inputStyle, ...{color:'orange', height:'15vh', 'font-size': '7vh'}}}/>
</div>

    )
}

const inputStyle = {'font-weight':'900', height:'16vh', width:'100%', 'font-size': '11vh', 'text-align': 'center',
                    border:'none', 'outline': 'none', 'background-color':'dimgray'}

/*

const inputStyle = {'font-weight':'900', height:'13vh', width:'100%', 'font-size': '8vh', 'text-align': 'center',
                    border:'none', 'outline': 'none', 'background-color':'dimgray'}
<input value='' 
                
                style={{...inputStyle, ...{color:'orange', width:'100%', height:'5vh', 'font-size': ''}}}/>

  <input value={property.bottomText}
                onChange={(e) => {
                    property.bottomText = e.target.value
                    setUpdateInput(!updateInput)}
                }
                style={{...inputStyle, ...{color:'orange', 'font-size': '6vh'}}}/>
*/