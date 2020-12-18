

/* 
 * Description : This class file defines the elements of the Email structure and method to Send the email
 *               
 * Author : github - @rsarpal 
 */

import Property from '../Resources/PropertyRead';
import request from 'request';

export default class MailStructure{

    constructor(authToken,recipient,subject,attachments){

        this.sendMailBody = {
            'message': {
                'subject': subject,
                'body': {
                    'contentType': "html",
                    'content': "<a href=https://github.com/rsarpal/owamail>Checkout github link of this project</a>"
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

        this.options = {
            'method': 'POST',
            'url': "",
            'headers':{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            'body': JSON.stringify(this.sendMailBody)
        };

        this.prop= new Property("SenderAuth");
        this.subject=subject;
    }

    formUrl(){
        this.options.url=this.prop.url + this.prop.accountId + '/sendMail';
    }

    sendMail() { 
        this.formUrl();
        return new Promise((resolve, reject) => {
            console.log(this.options);
            request(this.options, function (error, response) {
                if (error) throw new Error(error);
                console.log(response.body);
                resolve(response);
            }) 
        })
    }
}
  
