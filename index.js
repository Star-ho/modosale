//npx babel-node --presets @babel/env index.js

import {getDataArray} from './yogiyo' 
import {getData} from './baemin.js'

let data;
(async ()=>{
data={yogiyo:await getDataArray()};
Object.assign(data,{baemin:await getData()})
console.log(data)
})()
var http = require("http");


http.createServer(function (request, response) {

   // Set the response HTTP header with HTTP status and Content type
   response.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});

   // Send the response body "Hello World"
   response.end(JSON.stringify(data));
}).listen(3000);
