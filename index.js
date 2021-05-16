//npx babel-node --presets @babel/env yogiyo.js

//Load HTTP module
import {getDataArray} from './yogiyo' 
import {getData} from './baemin.js'

let data;
(async ()=>{
data={yogiyo:await getDataArray()};
Object.assign(data,{baemin:await getData()})
console.log(data)
})()
var http = require("http");


//Create HTTP server and listen on port 8000 for requests
http.createServer(function (request, response) {

   // Set the response HTTP header with HTTP status and Content type
   response.writeHead(200, {'Content-Type': 'text/plain'});

   // Send the response body "Hello World"
   response.end(JSON.stringify(data));
}).listen(3000);
