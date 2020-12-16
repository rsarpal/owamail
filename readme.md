# Description


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



 