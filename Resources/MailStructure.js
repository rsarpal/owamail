import request from 'request';

//mail

export default class MailStructure{

    constructor(url,authToken,recipient,subject){

        this.mailAttachment;

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
                    //address: "rsrecipient@automationwork.onmicrosoft.com"
                    'address': recipient
                }
                }
            ]
            },
            'saveToSentItems': "true"
        }

        this.options = {
            'method': 'POST',
            'url': url,
            'headers':{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            },
            'body': JSON.stringify(this.sendMailBody)
        }
    }

    sendMail() { 
        return new Promise((resolve, reject) => {
            console.log(this.options);
            request(this.options, function (error, response) {
                if (error) throw new Error(error);
                //console.log(response.body);
                resolve(response);
            }) 
        })
    };
}
  
