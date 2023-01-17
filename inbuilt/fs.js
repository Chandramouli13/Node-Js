
// fs - File system
/*
write file
read file
rename file
delete file
*/

let fs = require('fs');


///////////////// write file /////////////

// fs.writeFile('myfile.txt', 'This is node fs code', () => {
//     console.log('File Created');
// })

// myfile.txt file got created and written content(This is node fs code) inside.
// // This is node fs code 
// if we want to write multiple content it cannot overwrite multiple times.

/////// here comes we use appendFile
/////////////////  Add file /////////////////
// fs.appendFile('myText.txt', 'This is node fs code \n', () => {
//     console.log('File Created');
// })

// myfile.txt file got created and written content(This is node fs code) inside
// multiple times like :
/*
This is node fs code 
This is node fs code 
This is node fs code 
This is node fs code 
This is node fs code
*/ 

////////////////// read file //////////////

// fs.readFile('myText.txt',(err,data) => {
//     if(err) throw err;
//     console.log(data)
// })

// output
/* 
$ node fs.js
<Buffer 54 68 69 73 20 69 73 20 6e 6f 64 65 20 66 73 20 63 6f 64 65 20 0a 54 68
69 73 20 69 73 20 6e 6f 64 65 20 66 73 20 63 6f 64 65 20 0a 54 68 69 73 20 69 ..
. 60 more bytes> 
*/

// we have encode the data to read it.
// browser understand the encoding - encrypting the data
// To encode this we use UTF-8 
// fs.readFile('myText.txt','UTF-8', (err,data) => {
//     if(err) throw err;
//     console.log(data)
// })

// output
/*
$ node fs.js
This is node fs code
This is node fs code
This is node fs code
This is node fs code
This is node fs code
*/

/////// we can read the json file also //////
// fs.readFile('data.json','UTF-8', (err,data) => {
//     if(err) throw err;
//     console.log(data)
// })

// output
/*
$ node fs.js
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


/////////////////// rename file /////////////////

// fs.rename('myText.txt','myCode.txt',(err,data) => {
//     if(err) throw err;
//     console.log('File renamed')
// })

// myText.txt file renamed to myCode.txt 


/////////////////// delete file /////////////////

// fs.unlink('myCode.txt',(err,data) => {
//     if(err) throw err;
//     console.log('File Deleted')
// })

// In the inbuilt folder - myCode.txt file got deleted.

