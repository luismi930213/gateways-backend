# GatewaysBack
This sample project is managing gateways - master devices that control multiple peripheral devices.
This project was intended to function as an API for [GatewaysFront](https://github.com/luismi930213/gateways-frontend) project.

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 16.13.*

# Getting started
- Clone the repository
```
git clone  
```
- Install dependencies
```
cd <project_name>
npm install
```
- Build and run the project
```
npm start
```
  Navigate to `http://localhost:3000`

- API endpoints

 1. Gateways endpoints
    - GET: http://localhost:3000/gateways (all gateways)
    - GET: http://localhost:3000/gateways/:id (one gateway by id)
    - POST: http://localhost:3000/gateways (create one gateway)
    - PUT: http://localhost:3000/gateways/:id (update one gateway by id)
    - DELETE: http://localhost:3000/gateways/:id (remove one gateway by id)
 2. Peripherals endpoints
    - GET: http://localhost:3000/peripherals (all peripherals)  
    - GET: http://localhost:3000/peripherals/:id (one peripheral by id)
    - POST: http://localhost:3000/peripherals (create one peripheral)
    - PUT: http://localhost:3000/peripherals/:id (update one peripheral by id)
    - DELETE: http://localhost:3000/peripherals/:id (remove one peripheral by id)  

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **node_modules**         | Contains all  npm dependencies                                                            |
| **src**                  | Contains all  source code              |
| **src/_ _ test _ _**      | Contains all test files
| **src/config**              | Contains sequelize configuration file.  
| **src/migrations**      | Database models migrations
| **src/routes**           | Contain all routes                      
| **src/models**           | Models define schemas that will be used in storing and retrieving data from database  |
| **src/services**           | Contains basemodel.service.js, utility service to make all database queries providing a Model name  |
| **src**/app.js         | Entry point to express app                                                               |
| **src**/test.data.js | This is just for testing purpose, in production environment use Migrations instead |
| package.json             | Contains npm dependencies as well as Node scripts |

## Testing
The tests are  written in [Jest.js](https://jestjs.io/)

### Running tests using NPM Scripts
````
npm run test
````
Test files are created under _ _ test _ _  folder.