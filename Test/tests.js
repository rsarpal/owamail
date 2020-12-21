/* eslint-disable no-undef */
import path from 'path';
import { v4 as uuidv4 } from 'uuid'; 
import AuthStructure from '../Resources/AuthStructure';
import GetEmail from '../Resources/GetEmail';
import MailAttachment from '../Resources/MailAttachment';
import MailStructure from '../Resources/MailStructure';
import Property from '../Resources/PropertyRead';


// Read the Sender properties from config file
let prop= new Property("SenderAuth");
// Read receipient properties from config file
let prop_recv= new Property("ReceiverAuth");

//Intialise Auth
let auth=new AuthStructure(prop.tenantId,prop.clientId,prop.clientSecret);



fixture `Initiate Auth, Send and Verify Email`
        .before(async ctx =>{
            //uuid subjectId to make it unique
            ctx.m_subjectId=uuidv4();
        });



   test('Authenticate Send Email with url and Verify Email', async t => {   
 
      //Authenticate with Graph API
      var authResponse = await auth.getAuthResponseData();
      await t
         .expect(authResponse.statusCode).eql(200);

      //Save authentication token
      var json= JSON.parse(authResponse.body);
      auth.authToken=json.access_token;

   
      /*Send Email*/
      //MailStructure  (authToken,recipient,uuidsubject,blankattachment)
      let m= new MailStructure(auth.authToken,prop_recv.accountId,t.fixtureCtx.m_subjectId,[]);
      
      // send email
      var mResponse = await m.sendMail();
      await t
         .expect(mResponse.statusCode).eql(202)
         .wait(3000); //wait for email to get delivered

    
      /* VERIFY EMAIL*/
      //url - https://graph.microsoft.com/v1.0/users/{{UserId}}/messages/?$search="subject:3b05d1a3-dbc7-41e1-a777
      let g= new GetEmail(auth.authToken,t.fixtureCtx.m_subjectId);
     
      //Verify email from the receipient mailbox
      var readResponse = await g.readEmail();
      await t
         .expect(readResponse.statusCode).eql(200)
         .expect(readResponse.body).contains(prop.sendContentUrl,'Email does not contain the expected url');
   });



fixture `Initiate Auth Send Email With Attachment And Verfiy it`
            .before(async ctx =>{
                //uuid subjectId to make it unique
                ctx.m_subjectId=uuidv4();
            });

   test('Authenticate, Send Email with Attachment and Verify Email', async t => {   
 
      /* GENERATE AUTHENTICATION */

      //Authenticate with Graph API
      var authResponse = await auth.getAuthResponseData();
      await t
         .expect(authResponse.statusCode).eql(200);

      //Save authentication token
      var json= JSON.parse(authResponse.body);
      auth.authToken=json.access_token;



      /* SEND EMAIL WITH ATTACHMENT */
      
      //Initialize attachment
      let attach= new MailAttachment(path.join(__dirname,"/../TestData/attach.txt"));
      // Load Attachment
      attach.addAttachment();

      //Initialse MailStructure (authToken,recipient,uuidsubject,attachment)
      let m= new MailStructure(auth.authToken,prop_recv.accountId,t.fixtureCtx.m_subjectId,[attach.attachment]);  
      var sendMailResponse = await m.sendMail();
      await t
         .expect(sendMailResponse.statusCode).eql(202)
         .wait(3000); //wait for email to get delivered


   
      
      /* VERIFY EMAIL */

      //https://graph.microsoft.com/v1.0/users/{{UserId}}/messages/?$search="subject:3b05d1a3-dbc7-41e1-a777"
      let g= new GetEmail(auth.authToken,t.fixtureCtx.m_subjectId);
      var verifyResponse = await g.readEmail();
      await t
         .expect(verifyResponse.statusCode).eql(200)
         .expect(verifyResponse.body).contains('Checkout','Email does not contain the expected text');
      
      //extract message ID
      g.getMessageId(verifyResponse.body);

      //verify Attachment file
      verifyResponse = await g.readAttachment();
      await t
         .expect(verifyResponse.statusCode).eql(200)
         .expect(verifyResponse.body).contains('testattach','Email does not contain the expected attachment')
         .expect(verifyResponse.body).contains(attach.attachment.contentBytes,'Email attachment content does not match');
       
  
  });