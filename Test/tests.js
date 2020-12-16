import request from 'request';
import AuthStructure from '../Resources/AuthStructure';
import MailStructure from '../Resources/MailStructure';



fixture `Initiate Auth And Send Email`;

let auth=new AuthStructure();

test('Initiate Auth', async t => {   
    var response = await auth.getAuthResponseData();
    await t
       .expect(response.statusCode).eql(200);

    var json= JSON.parse(response.body)
    auth.authToken=json.access_token;
    console.log(auth.authToken);
});


test('Send Email', async t => {  
  //MailStructure  (url,authToken,recipient)
  let m= new MailStructure('https://graph.microsoft.com/v1.0/users/rstest@automationwork.onmicrosoft.com/sendMail',auth.authToken,"rstest@automationwork.onmicrosoft.com");
  var response = await m.sendMail();
  await t
     .expect(response.statusCode).eql(202);

});


test('Send Email With Attachment', async t => {
  //MailStructure  (url,authToken,recipient)
  let m= new MailStructure('https://graph.microsoft.com/v1.0/users/rstest@automationwork.onmicrosoft.com/sendMail',auth.authToken,"rstest@automationwork.onmicrosoft.com");

  var response = await m.sendMail();
  await t
     .expect(response.statusCode).eql(202);

});
