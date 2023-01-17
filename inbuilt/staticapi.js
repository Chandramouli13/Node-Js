/*
lets combine two things - http.js and fs.js
To combine both we use :
static api - it is not yet connected to the database called static api.
*/

let http = require('http');
let fs = require('fs');
let port = 4600;  // we can give any port number.

let server = http.createServer((req, res) => {
    fs.readFile('data.json','UTF-8', (err, data) => {
        if (err) throw err;
        res.write(data);
        res.end()
    })
})

server.listen(port)

// run this on gitbash or cmp(command prompt) using - node staticapi.js
// output
// request(data) will display on the browser using localhost:4600 on the search.
// - This data.json (On screen inside browser this data is displayed).
/*
[
    {
      "_id": "6187738a62a1816f8858634e",
      "location_id": 4,
      "location_name": "Bibvewadi, Pune",
      "state_id": 2,
      "state": "Maharashtra",
      "country_name": "India"
    },
    {
      "_id": "6187738a62a1816f8858634d",
      "location_id": 1,
      "location_name": "Ashok Vihar Phase 3, New Delhi",
      "state_id": 1,
      "state": "Delhi",
      "country_name": "India"
    },
    {
      "_id": "6187738a62a1816f8858634f",
      "location_id": 8,
      "location_name": "Jeevan Bhima Nagar, Bangalore",
      "state_id": 3,
      "state": "Karnataka",
      "country_name": "India"
    },
    {
      "_id": "6187738a62a1816f88586350",
      "location_id": 13,
      "location_name": "Sector 13, Chandigarh",
      "state_id": 4,
      "state": "Punjab",
      "country_name": "India"
    }
  ]
*/

// Press ^C at any time to quit. To stop running server.
