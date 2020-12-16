# Description
This project is intended for Sending Email over Outlook using Microsoft Authentication Library(MSAL) and Microsoft GRAPH API endpoints.

## Setup in Azure/Outlook
 - For Sender/Reciever accounts 
    1. Login to Microsoft Azure and setup a new Application under "Application Registration" (https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade)

    2. Note down clientID for your application from Azure. 
    3. Additonally, go to Certificates & Secrets and generate a client secret for your applicaiton. Clientid and Secret is used in `class AuthStructure` to connect to Outlook.
    4. Go to API Permission section and add request for Mail specific permissions eg Mail.Send, Mail.Read, Mail.Write, Mail.Read.Basic, Mail.Read.Basic.All, Mail.ReadWrite, User.Read.

    5. Login to Azure from the Administrator Account and Grant permission to the user for all permissions requested in Step 4.


## Setup VSCode
1. Install node.js   
2. Install Visual Studio Code and open project
3. Run Terminal inside VS Code run following commands:
    -   npm init
    -   npm install testcafe
4. On Mac "screen recording permission" needs to be granted from System Preferences

## Test Files
All test files are contained in Test folder and can be run using the command sepecified in the "Running Section" section.

## Running Test
- From Command line using npx
    `npx testcafe chrome:headless Test/postAuthRequest.js <--fixture "Initiate Auth And Send Email"> `

- Using Package.json : add the `testcafe` command to the scripts section in 
package.json

    `"scripts": {
        "test": "testcafe chrome:headless Test/postAuthRequest.js"
    },`

    And run tests by running `npm test` in command line.



 