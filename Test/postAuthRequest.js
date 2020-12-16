import request from 'request';
import MailStructure from './postMailRequest';

var authToken;

var options = {
  'method': 'POST',
  'url': 'https://login.microsoftonline.com/6e240e84-dd08-4a4b-a970-539f0ff869f9/oauth2/v2.0/token',
  'headers': {
    'Content-Type': 'application/x-www-form-urlencoded'
  //  'SdkVersion': 'postman-graph/v1.0',
  //  'Cookie': 'stsservicecookie=estsfd; x-ms-gateway-slice=prod; fpc=Ap-_mjmQPmZPsgKot3SA-kzB5CFFAQAAAJyNadcOAAAA'
  },
  form: {
    'grant_type': 'client_credentials',
    'client_id': '967f2c15-88f7-4e66-a674-c5723df90083',
    'client_secret': '7JC74o_j-rxPi1sKpgo6Oc0i--yoMbij4~',
    'scope': 'https://graph.microsoft.com/.default'
  }
};

const getAuthResponseData = () => new Promise((resolve, reject) => {
    request(options, function (error, response) {
      if (error) throw new Error(error);
      //console.log(response.body);
      resolve(response);
    }) 
});



fixture `Initiate Auth And Send Email`;

test('Initiate Auth', async t => {
    var response = await getAuthResponseData();
    await t
       .expect(response.statusCode).eql(200);

    var json= JSON.parse(response.body)
    authToken=json.access_token;
    console.log(authToken);
});


test('Send Email', async t => {
  
  let m= new MailStructure('https://graph.microsoft.com/v1.0/users/rstest@automationwork.onmicrosoft.com/sendMail',authToken,"rstest@automationwork.onmicrosoft.com");

  var response = await m.sendMail();
  await t
     .expect(response.statusCode).eql(202);

});





