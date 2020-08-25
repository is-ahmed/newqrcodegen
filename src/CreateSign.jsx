import React, { useState }  from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Modal, Button } from 'semantic-ui-react';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

export default function CreateSign({doneHandle, property}) {

    const [registrationSign, _] = useState({image: '', blob: ''})

    
    function donePressed() {
        var element = document.getElementById("mypage");
    
        html2canvas(element).then(function(canvas) {
            // var base64image = canvas.toDataURL("image/png");
            registrationSign.image = canvas.toDataURL("image/png");
            
            // window.open(registrationSign.image, "_blank");
            canvas.toBlob(function(blob) {
                // Generate file download
                // registrationSign.blob = blob;
                // doneHandle(blob); 
                saveAs(blob, property.address + ".png");
                property.sign = blob;
               
                
                doneHandle();
                // setDonePopup(true);
                // window.saveAs(blob, "yourwebsite_screenshot.png");
            });
            
        });
    }


    

    // alert(donePopup);
    
    return (
    
    <>
        <Modal open={true}>
            <Modal.Header>
                {property.businessName}
                <p>
                    {property.address}
                </p>
            </Modal.Header>
            <Modal.Actions>
                <Button color='blue' inverted onClick={donePressed} >
                    Download to Print or Save
                </Button>
                
                <Button color='grey' onClick={doneHandle}>
                    Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    </>
    )
}