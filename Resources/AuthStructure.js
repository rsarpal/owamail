import request from 'request';

//Auth
export default class AuthStructure{

  constructor(){

        this.authToken;

        this.options = {
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
  }

  getAuthResponseData() {
    return new Promise((resolve, reject) => {
      request(this.options, function (error, response) {
        if (error) throw new Error(error);
        //console.log(response.body);
        resolve(response);
      }) 
    })
  }
    
}



