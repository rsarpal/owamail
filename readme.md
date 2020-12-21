# Description
This project is intended for Sending Email and Verifying Email over Outlook using Microsoft Authentication Library(MSAL) and Microsoft GRAPH API endpoints.

All the sent emails have a url in the message. The test sends and verifies emails with and without attachment.

To create uniqueness in emails the email subject uses uuid. 

## Setup in Azure/Outlook
 - For Sender/Reciever accounts 
    1. Login to Microsoft Azure and setup a new Application under "Application Registration" (https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade). Add Sender and Receiver email accounts as Owner of the application.

    2. Note down clientID for your application from Azure. 
    3. Additonally, go to Certificates & Secrets and generate a client secret for your applicaiton. Clientid and Secret is used in `class AuthStructure` to connect to Outlook.
    4. Go to API Permission section and add request for Mail specific permissions eg Mail.Send, Mail.Read, Mail.Write, Mail.Read.Basic, Mail.Read.Basic.All, Mail.ReadWrite, User.Read.

    5. Login to Azure from the Administrator Account and Grant permission to the user for all permissions requested in Step 4    


## Setup VSCode
1. Install node.js   
2. Install Visual Studio Code and open project
3. Run Terminal inside VS Code run following commands:
    -   npm init
    -   npm install testcafe
    -   npm install request
    -   npm install uuid
    -   npm install properties-reader
4. On Mac "screen recording permission" needs to be granted from System Preferences

## Test Files
 - **Test Cases**:  All test cases are contained in Test folder and can be run using the command sepecified in the "Running Section" section.
 - **Resources/Libraries**: The js libraries containing classes are stored in `/Resources` folder.
    -   AuthStructure.js : Class file for authentication.
    -   MailStructure.js : Class file for defining mail structure and methods to send email.
    -   MailAttachment.js : Class file for attaching mail attachments to emails being sent.
    -   PropertyReader.js : Class file to read configuration ini file
    -   GetEmailjs : Class file to get emails from mailbox and to read email attachments.

 - **Test Data** : The test data attachment file is stored in `/TestData` folder.



## Config File
Config.ini file contains the url and authentication credentials which are used by the application. The file has categories and key=value pairs of data.

It defines below attribues.

```ini
[Url]
url=https://graph.microsoft.com/v1.0/users/
sendContentUrl=https://github.com/rsarpal/owamail

#Azure ids for Sender "fsecure" application
[SenderAuth]
accountId=rstest@automationwork.onmicrosoft.com
clientId=
tenantId=
clientSecret=


#Azure ids for Receiver "fsecure" application
[ReceiverAuth]
accountId=rsrecipient@automationwork.onmicrosoft.com
clientId=
tenantId=
clientSecret=
```

## Running Test

Tests are setup to run in headless mode.

- From Command line using npx
    - using fixture name `npx testcafe chrome:headless Test/tests.js --fixture "Initiate Auth And Send Email" `
    - using test name    `npx testcafe chrome:headless Test/tests.js  -t 'Authenticate, Send Email with Attachment and Verify Email'`

- Using Package.json : add the `testcafe` command to the scripts section in 
package.json

    ```json
    "scripts": {
        "test": "testcafe chrome:headless Test/tests.js"
    },
    ```

    Further other reporting options can be used with `-r ` switch eg `-r list` 

    And run tests by running `npm test` in command line.


## Results



```

  Running tests in:
 - Chrome 87.0.4280.88 / macOS 11.1.0

 Initiate Auth, Send and Verify Email
 ✓ Authenticate Send Email with url and Verify Email

 Initiate Auth Send Email With Attachment And Verfiy it
 ✓ Authenticate, Send Email with Attachment and Verify Email

```

 