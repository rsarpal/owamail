import request from 'request';

//Auth
export default class AuthStructure{

  constructor(tenantId,clientId,clientSecret){

        this.authToken;

        this.options = {
          'method': 'POST',
          'url': 'https://login.microsoftonline.com/' + tenantId + '/oauth2/v2.0/token',
          'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          form: {
            'grant_type': 'client_credentials',
            'client_id': clientId,
            'client_secret': clientSecret,
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



