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

    var json= JSON.parse(response.body)
    auth.authToken=json.access_token;
    console.log(auth.authToken);
});

test('Send Email', async t => {  
  //MailStructure  (url,authToken,recipient,uuidsubject,attachment)
  
  let m= new MailStructure(auth.authToken,prop_recv.accountId,t.fixtureCtx.m_subjectId,[]);
  var response = await m.sendMail();
  await t
     .expect(response.statusCode).eql(202);

});

test('Verify Email', async t => {  
    //https://graph.microsoft.com/v1.0/users/{{UserId}}/messages/?$search="subject:3b05d1a3-dbc7-41e1-a777
    let g= new GetEmail(auth.authToken,t.fixtureCtx.m_subjectId);
    var response = await g.readEmail();
    await t
       .expect(response.statusCode).eql(200);
  
  });



  fixture `Send Email With Attachment And Verfiy it`
            .before(async ctx =>{
                //uuid subjectId to make it unique
                ctx.m_subjectId=uuidv4();
            });

  test('Send Email With Attachment', async t => {

    //Load Attachment
    //let attach= new MailAttachment("../TestData/attach.txt");
    let attach= new MailAttachment(path.join(__dirname,"/../TestData/attach.txt"));
    attach.addAttachment();
  
    let m= new MailStructure(auth.authToken,prop_recv.accountId,t.fixtureCtx.m_subjectId,[attach.attachment]);  
    
    var response = await m.sendMail();
    await t
       .expect(response.statusCode).eql(202);
  
  });
  
  test('Verify Email With Attachment', async t => {  
    //https://graph.microsoft.com/v1.0/users/{{UserId}}/messages/?$search="subject:3b05d1a3-dbc7-41e1-a777
    let g= new GetEmail(auth.authToken,t.fixtureCtx.m_subjectId);
    var response = await g.readEmail();
    await t
       .expect(response.statusCode).eql(200);
  
  });