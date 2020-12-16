import request from 'request';
import { v4 as uuidv4 } from 'uuid'; 
import AuthStructure from '../Resources/AuthStructure';
import MailStructure from '../Resources/MailStructure';


// Azure ids for "fsecure" application
const clientId='967f2c15-88f7-4e66-a674-c5723df90083';
const tenantId='6e240e84-dd08-4a4b-a970-539f0ff869f9';
const clientSecret='7JC74o_j-rxPi1sKpgo6Oc0i--yoMbij4~';

fixture `Initiate Auth And Send Email`;

let auth=new AuthStructure(tenantId,clientId,clientSecret);

test('Initiate Auth', async t => {   
    var response = await auth.getAuthResponseData();
    await t
       .expect(response.statusCode).eql(200);

    var json= JSON.parse(response.body)
    auth.authToken=json.access_token;
    console.log(auth.authToken);
});


test('Send Email', async t => {  
  //MailStructure  (url,authToken,recipient,uuidsubject)
  let m= new MailStructure('https://graph.microsoft.com/v1.0/users/rstest@automationwork.onmicrosoft.com/sendMail',auth.authToken,"rstest@automationwork.onmicrosoft.com",uuidv4());
  var response = await m.sendMail();
  await t
     .expect(response.statusCode).eql(202);

});


test('Send Email With Attachment', async t => {
  //MailStructure  (url,authToken,recipient)
  let m= new MailStructure('https://graph.microsoft.com/v1.0/users/rstest@automationwork.onmicrosoft.com/sendMail',auth.authToken,"rstest@automationwork.onmicrosoft.com",uuidv4());

  var response = await m.sendMail();
  await t
     .expect(response.statusCode).eql(202);

});
