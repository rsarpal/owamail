

/* 
 * Description : This class file defines the elements of the Email structure and method to Send the email
 *               
 * Author : github - @rsarpal 
 */

import Property from '../Resources/PropertyRead';
import request from 'request';

export default class MailStructure{

    constructor(authToken,recipient,subject,attachments){

        //initialise object to read Sender auth credentials 
        this.prop= new Property("SenderAuth");

        //initialize mail body
        this.sendMailBody = {
            'message': {
                'subject': subject,
                'body': {
                    'contentType': "html",
                    'content': "<a href=" + this.prop.sendContentUrl + ">Checkout github link of this project</a>"
                },
                'toRecipients': [
                    {
                    'emailAddress': {
                        'address': recipient
                    }
                    }
                ],
                'attachments' : attachments
            },
            'saveToSentItems': "true"
        };
 

        //initialize mail POST request options
        this.options = {
            'method': 'POST',
            'url': "",
            'headers':{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            'body': JSON.stringify(this.sendMailBody)
        };

       
        //initialse the mail subject
        this.subject=subject;
    }


    // Form the url for REST call for Graph API
    formUrl(){
        this.options.url=this.prop.url + this.prop.accountId + '/sendMail';
    }

    //method to Send email to the OWA server using Graph API
    sendMail() { 
        this.formUrl();
        return new Promise((resolve, reject) => {
            //console.log("Send Mail -" + JSON.stringify(this.options));
            request(this.options, function (error, response) {
                if (error) throw new Error(error);
                //console.log("Send Mail Response Status -" + response.status);
                resolve(response);
            }); 
        });
    }
}
  
