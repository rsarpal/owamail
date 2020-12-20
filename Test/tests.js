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

//Initialize attachment
let attach= new MailAttachment(path.join(__dirname,"/../TestData/attach.txt"));


fixture `Initiate Auth And Send Email`
        .before(async ctx =>{
            //uuid subjectId to make it unique
            ctx.m_subjectId=uuidv4();
        });

   //Intialise Auth
   let auth=new AuthStructure(prop.tenantId,prop.clientId,prop.clientSecret);

   test('Initiate Auth', async t => {   
      //console.log("PROP - " + prop.tenantId + " ; " + prop.clientId + " ; " + prop.clientSecret);

      var response = await auth.getAuthResponseData();
      await t
         .expect(response.statusCode).eql(200);

      //Save authentication token
      var json= JSON.parse(response.body);
      auth.authToken=json.access_token;
   });

   test('Send Email', async t => {  
   //MailStructure  (url,authToken,recipient,uuidsubject,attachment)
   
   let m= new MailStructure(auth.authToken,prop_recv.accountId,t.fixtureCtx.m_subjectId,[]);
   var response = await m.sendMail();
   
   await t
      .wait(3000) //wait for email to get delivered
      .expect(response.statusCode).eql(202);
   });

   
   test('Verify Email', async t => {
      //https://graph.microsoft.com/v1.0/users/{{UserId}}/messages/?$search="subject:3b05d1a3-dbc7-41e1-a777
      let g= new GetEmail(auth.authToken,t.fixtureCtx.m_subjectId);
      var response = await g.readEmail();
      await t
         .expect(response.statusCode).eql(200)
         .expect(response.body).contains(prop.sendContentUrl,'Email does not contain the expected url');
   });



 fixture `Send Email With Attachment And Verfiy it`
            .before(async ctx =>{
                //uuid subjectId to make it unique
                ctx.m_subjectId=uuidv4();
            });

  test('Send Email With Attachment', async t => {

    //Load Attachment
    attach.addAttachment();

    //Initialse MailStructure
    let m= new MailStructure(auth.authToken,prop_recv.accountId,t.fixtureCtx.m_subjectId,[attach.attachment]);  
    
    var response = await m.sendMail();
    await t
       .wait(3000) //wait for email to get delivered
       .expect(response.statusCode).eql(202);
  
  });
  
  test('Verify Email With Attachment', async t => {  
    //https://graph.microsoft.com/v1.0/users/{{UserId}}/messages/?$search="subject:3b05d1a3-dbc7-41e1-a777"
    let g= new GetEmail(auth.authToken,t.fixtureCtx.m_subjectId);
    var response = await g.readEmail();
    await t
       .expect(response.statusCode).eql(200)
       .expect(response.body).contains(prop.sendContentUrl,'Email does not contain the expected url');
   
    //extract message ID
    g.getMessageId(response.body);

   //verify Attachment file
    response = await g.readAttachment();
    await t
       .expect(response.statusCode).eql(200)
       .expect(response.body).contains('testattach','Email does not contain the expected attachment')
       .expect(response.body).contains(attach.attachment.contentBytes,'Email content does not match');
       
  
  });