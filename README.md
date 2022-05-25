Workspace Setup:


step 1:

Clone git repo to your local machine 

git clone 

Step 2: 

Install local dependencies from root directory of the repo with the following command
in your terminal pointing the location where the repo has been cloned:
run $npm install 

Step 3:

Tests are located in the apiTest folder
Use following command to run API tests: npm run test

Please note that the node version has to be ~12.20.0

# Daylight SDET challenge


> This repo verifies create event and update event API for eventbrite.com



## Tech

This repo uses Jest testing framework and supertest http agent 


- [node.js] - evented I/O for the backend
- [jest] - testing framework. Currently used to test API for this repo
- [supertest] - http agent


## Installation

This repo requires [Node.js](https://nodejs.org/) v12+ to run.

Install the dependencies and devDependencies and start the server.

```sh
git clone https://github.com/shivani2194/daylight.git
npm i
npm run test
```



   [git-repo-url]: <https://github.com/shivani2194/daylight.git>
   
