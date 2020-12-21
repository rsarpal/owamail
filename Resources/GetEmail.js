/* 
 * Description : This class file defines the properties and methods to GET email from OWA
 *               
 * Author : github - @rsarpal 
 */


import request from 'request';
import Property from '../Resources/PropertyRead';

export default class GetEmail{
    constructor(authToken,m_subjectId){

        //ID of the email message
        this.messageId="";

        //mail request options
        this.options = {
            'method': 'GET',
            'url': "",
            'headers':{
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + authToken
            }
        };

        //initialise object to read Receiver auth credentials 
        this.prop_recv= new Property("ReceiverAuth");

        //initialze the unique subject id (uuid)
        this.m_subjectId=m_subjectId;

        //form the url 
        this.formUrl();

    }

    // Form the url for REST call for Graph API
    formUrl(){
        this.options.url=this.prop_recv.url+ this.prop_recv.accountId + '/messages?$search="subject:' + this.m_subjectId + '"';
    }

    //method to Get email from the OWA server using Graph API
    readEmail(){
        
        return new Promise((resolve, reject) => {
            request(this.options, function (error, response) {
                if (error) throw new Error(error);
                //console.log("Verify -" + response.body);
                resolve(response);
              }); 
        });

    }


    //Method to read the unique id of the email message from the message body
    getMessageId(body){
        this.messageId=JSON.stringify(JSON.parse(body).value[0]["id"]);
    }

    //calls the graph API and gets the attachment of the email using the message id
    readAttachment(){
        return new Promise((resolve, reject) => {

            //attachment url 
            // GET https://graph.microsoft.com/v1.0/users/{userid}/messages/{msgid}/attachments/
            this.options.url=this.prop_recv.url+ this.prop_recv.accountId + '/messages/' + this.messageId + '/attachments/';

            request(this.options, function (error, response) {
                if (error) throw new Error(error);
                //console.log("Attachment -" + response.body);
                resolve(response);
              });
        });
    }
}
