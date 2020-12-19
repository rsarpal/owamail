/* 
 * Description : This class file defines the properties and methods to GET email from OWA
 *               
 * Author : github - @rsarpal 
 */


import request from 'request';
import Property from '../Resources/PropertyRead';

export default class GetEmail{
    constructor(authToken,m_subjectId){
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

        //initialze the subject id 
        this.m_subjectId=m_subjectId;

    }

    // Form the url for REST call for Graph API
    formUrl(){
        this.options.url=this.prop_recv.url+ this.prop_recv.accountId + '/messages?$search="subject:' + this.m_subjectId + '"';
    }

    //method to Get email from the OWA server using Graph API
    readEmail(){
        this.formUrl();
        return new Promise((resolve, reject) => {
            request(this.options, function (error, response) {
                if (error) throw new Error(error);
                //console.log("Verify -" + response.body);
                resolve(response);
              }) 
        });

    }
}
