
==================================

This project simulates the zenterio Cloud using a straightforward boilerplate called Express & ES6 REST API Boilerplate.

The Node-Machines located in the source folders is the important code.

Getting Started
---------------

# Install dependencies
npm install

# Create a keyfile for the twitchapi
To have the application work you need to create the following file: keys.Json
The file must be located in: Company-CCC-Backend/backend/src/Machinepacks/machinepackc3twitch/machines/keys.json
This file will contain information about twitchapi keys. And several functions in the application will refer to this file that you create.
If this file is not created correctly several functions of the application will not work.
The file is already added to gitignore so your client-id will only be active in your local repository.
The file must contain the following information where you will fill in the information in accept-information and the-twitchapi-client-id:

[
  {
   "Accept": "accept-information",
   "Client": "the-twitchapi-client-id"
  }
]

# Start development live-reload server
PORT=8080 npm run dev

# Start production server:
PORT=8080 npm start

# Test a node-machine
Send GET-request to http://localhost:8080/api/twitch/filters or
cd to Machinepacks/machinepack-c3twitch and run "machinepack exec filters"
```
Docker Support
------
```sh
cd express-es6-rest-api

# Build your docker
docker build -t es6/api-service .
#            ^      ^           ^
#          tag  tag name      Dockerfile location

# run your docker
docker run -p 8080:8080 es6/api-service
#                 ^            ^
#          bind the port    container tag
#          to your host
#          machine port   

```

License
-------

MIT
