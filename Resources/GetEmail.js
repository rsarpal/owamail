/* 
 * Description : This class file defines the elements of the Email attachment and method to add read attachment file.
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
        this.prop_recv= new Property("ReceiverAuth");
        this.m_subjectId=m_subjectId;

    }

    formUrl(){
        this.options.url=this.prop_recv.url+ this.prop_recv.accountId + '/messages?$search="subject:' + this.m_subjectId + '"';
    }

    readEmail(){
        this.formUrl();
        return new Promise((resolve, error) => {
            request(this.options, function (error, response) {
                if (error) throw new Error(error);
                console.log("Verify -" + response.body);
                resolve(response);
              }) 
        });

    }
}
