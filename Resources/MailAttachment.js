import fs from 'fs'

export default class MailAttachment{

    constructor(file){
        this.attachment={
            '@odata.type': "#microsoft.graph.fileAttachment",
            'name': "testattach",
            'contentBytes': ""
        }; 
        this.file=file;
    }


    addAttachment(){

        //read file synchronus
        var data=fs.readFileSync(this.file, {encoding:'base64', flag:'r'} );
        
        //console.log("Read data - " + data);

        this.attachment.contentBytes= data;  

        //console.log("Add Attachment - " + this.attachment);
            
            
    }
}