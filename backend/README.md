
==================================

This project simulates the zenterio Cloud using a straightforward boilerplate called Express & ES6 REST API Boilerplate.

The Node-Machines located in the source folders is the important code.

Getting Started
---------------

# Install dependencies
npm install

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
