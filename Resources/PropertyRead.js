

/* 
 * Description : This class file reads properties defined in the config file. 
 *               The config file is used to store the authentication credentials/secrets for connecting to Mail account.
 * Author : github - @rsarpal 
 */

import propertiesReader from 'properties-reader';
import path from 'path';

export default class Property{
    constructor(type){
       
        //read property file
        this.properties = propertiesReader(path.join(__dirname,"/../config.ini"));

        //Graph API url
        this.url=this.properties.get('Url.url');

        //Message content url
        this.sendContentUrl=this.properties.get('Url.sendContentUrl');

        //Auth Ids
        this.clientId=this.properties.get(type + '.clientId');
        this.tenantId=this.properties.get(type + '.tenantId');
        this.clientSecret=this.properties.get(type + '.clientSecret');
        this.accountId=this.properties.get(type + '.accountId');
    }

}