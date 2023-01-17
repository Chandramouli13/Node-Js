/*
> What is HTTP is used for?
Hypertext Transfer Protocol (HTTP) is an application-layer protocol for transmitting hypermedia documents, 
such as HTML. It was designed for communication between web browsers and web servers, 
but it can also be used for other purposes.

> What is HTTP and example?
Stands for "Hypertext Transfer Protocol." HTTP is the protocol used to transfer data over the web. 
It is part of the Internet protocol suite and defines commands and services used for transmitting webpage data. 
HTTP uses a server-client model. A client, for example, may be a home computer, laptop, or mobile device.

> What is difference HTTP and https?
HTTPS is HTTP with encryption and verification. 
The only difference between the two protocols is that HTTPS uses TLS (SSL) 
to encrypt normal HTTP requests and responses, and to digitally sign those requests and responses.
As a result, HTTPS is far more secure than HTTP.

> What are the HTTP types?
The most commonly used HTTP request methods are GET, POST, PUT, PATCH, and DELETE. 
These are equivalent to the CRUD operations (create, read, update, and delete). 
GET: GET request is used to read/retrieve data from a web server.
    GET returns an HTTP status code of 200 (OK) if the data is successfully retrieved from the server.

POST: POST request is used to send data (file, form data, etc.) to the server. 
    On successful creation, it returns an HTTP status code of 201.

PUT: A PUT request is used to modify the data on the server. 
    It replaces the entire content at a particular location with data that is passed in the body payload. 
    If there are no resources that match the request, it will generate one.

PATCH: PATCH is similar to PUT request, but the only difference is, it modifies a part of the data. 
    It will only replace the content that you want to update.

DELETE: A DELETE request is used to delete the data on the server at a specified location.    
*/


let http = require('http');

// req >> what we will send to the server is called request.
// Three way to pass are (params,queryParams,body)

// res >> what server will send us back is called response.

let server = http.createServer((req, res) => {
    res.write('<h1>Hii From NodeJs Server</h1>');  // request
    res.end()       // end request
})

server.listen(5679);

// run this on gitbash or cmp(command prompt) using - node http.js
// output
/*
request(Hii From NodeJs Server) will display on the browser using localhost:5679 on the search.
- Hii From NodeJs Server (On screen inside browser this h1 tag is displayed).
*/

////////////////// To stop the running server node http.js we use ctrl C ( ^C )////////////////////
/*
$ node http.js
press ctrl C - it stops 
$ ^C
chand@MSI MINGW64 /d/EDUREKA/NodeJS Edureka/inbuilt (master)
$
*/
// This will stop the running server.
// Press ^C at any time to quit.



