import fs from 'fs'

/* 
 * Description : This class file defines the elements of the Email attachment and method to add read attachment file.
 *               
 * Author : github - @rsarpal 
 */


export default class MailAttachment{

    constructor(file){
        this.attachment={
            '@odata.type': "#microsoft.graph.fileAttachment",
            'name': "testattach",
            'contentBytes': ""
        }; 

        //attchment file
        this.file=file;
    }

    //read contents of file to be attached to the email and convert to base64
    addAttachment(){

        //read file synchronus
        var data=fs.readFileSync(this.file, {encoding:'base64', flag:'r'} );
        //console.log("Read data - " + data);

        this.attachment.contentBytes= data;  

        //console.log("Add Attachment - " + this.attachment);
            
            
    }
}