
// restApi steps:
// cmd

// D:\EDUREKA\Full Stack\NodeJS Edureka\restapi
 // if not working : Go to the restapi folder and user terminal.

// npm i mongodb

// npm i cors body-parser dotenv

// npm install -g nodemon

// If we are creating another file. just do > npm run dev
// note: No need to do the above steps for every time.

// npm run dev          // (dev created in package.json)

/*
package name cors
cors = cors origin resource sharing.

why we use cors
example: Migrating countries requires visa. we need approval to use.
if not, it is blocked. so here we use cors for authorization.
*/

/*
    // Params - what we pass after /
                we need to define if we want to use it.
                should be use for passing 1 or 2 values.
    
    // Query params - what we pass after ?
                      No need to define if we want to use it.
                      should use for passing multiple values.  
*/

let express = require('express');
let app = express();
let port = 9500;
let cors = require('cors');
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let bodyParser = require('body-parser');
let mongoUrl = "mongodb://localhost:27017";
// let mongoUrl = "mongodb+srv://test:test123@cluster0.4qwg65i.mongodb.net/?retryWrites=true&w=majority";
let db;

// middleware - supporting library
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res) => {
    res.send('<h1>Hii From Express</h1>')
})

// location
app.get('/location',(req,res) => {
   db.collection('location').find().toArray((err,result) => {
       if(err) throw err;
       res.send(result)
   })
})

// Restaurants
app.get('/restaurants',(req,res) => {
    db.collection('restaurants').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

/////// Params
// app.get('/restaurants/:id',(req,res) => {
//     let id = req.params.id
//     db.collection('restaurants').find().toArray((err,result) => {
//         if(err) throw err;
//         res.send(result)
//     })
// }) 

/////// Query params
// app.get('/restaurants',(req,res) => {
//     let id = req.query.stateId;
//     console.log(id)
//     db.collection('restaurants').find(query).toArray((err,result) => {
//         if(err) throw err;
//         res.send(result)
//     })
//  })

//// find with condition
//// here i want to pass only stateId=2
//// which contains stateId:2 will return.
  
// app.get('/restaurants',(req,res) => {
//     let stateId = Number(req.query.stateId)
//     let mealId = Number(req.query.mealId)
//     let query = {}
//     if (stateId && mealId) {
//         query = {state_id:stateId,"mealTypes.mealtype_id":mealId}
//     } else if (stateId) {
//         query = {state_id:stateId}
//     } else if (mealId) {
//         query = {"mealTypes.mealtype_id":mealId}
//     }
//     db.collection('restaurants').find(query).toArray((err,result) => {
//         if(err) throw err;
//         res.send(result)
//     })
// })

////// search based on filters (restaurants app) ///////////

// app.get('/filters/:mealId',(req,res) => {
//     let query = {}
//     let mealId = Number(req.params.mealId)
//     let cuisineId = Number(req.query.cuisineId)
//     if (cuisineId) {
//         query = {
//             "mealTypes.mealtype_id":mealId,
//             "cuisines.cuisine_id":cuisineId
//         }
//     }    
//     db.collection('restaurants').find(query).toArray((err,result) => {
//         if(err) throw err;
//         res.send(result)
//     })
// })

////// search based on cost (restaurants app) //////////////
//// gt -greater than & lt - lower than /////
//// lcost - low cost & ht - high cost

// app.get('/filters/:mealId',(req,res) => {
//     let query = {}
//     let mealId = Number(req.params.mealId)
//     let cuisineId = Number(req.query.cuisineId)
//     let lcost = Number(req.query.lcost)
//     let hcost = Number(req.query.hcost)

//     if (cuisineId) {
//         query = {
//             "mealTypes.mealtype_id":mealId,
//             "cuisines.cuisine_id":cuisineId
//         }
//     } else if (lcost && hcost) {
//         query = {
//             "mealTypes.mealtype_id":mealId,
//             $and: [{cost:{$gt:lcost,$lt:hcost}}]
//         }
//     }   
//     db.collection('restaurants').find(query).toArray((err,result) => {
//         if(err) throw err;
//         res.send(result)
//     })
// })


// mealType // QuickSearch
app.get('/mealType',(req,res) => {
    db.collection('mealType').find().toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

// details of restaurants  
// here, restId is _id of restaurants. copy _id and use after / (http://localhost:9500/details/63aa8f77a4f35f256e3a8418)
app.get('/details/:restId',(req,res) => {
    let id = mongo.ObjectId(req.params.restId)

    db.collection('restaurants').find({_id:id}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})

// menu
// here, restId is restaurant_id of restaurants. (http://localhost:9500/menu/10)
// we will get the menu of the  "restaurant_id": 10,
app.get('/menu/:restId',(req,res) => {
    let id = Number(req.params.restId)

    db.collection('menu').find({restaurant_id:id}).toArray((err,result) => {
        if(err) throw err;
        res.send(result)
    })
})


// menu user selected
app.post('/menuItem',(req,res) => {
    if(Array.isArray(req.body.id)){
        db.collection('menu').find({menu_id:{$in:req.body.id}}).toArray((err,result) => {
            if(err) throw err;
            res.send(result)
        })
    } else {
        res.send('Invalid Input')
    }
})

// Place order
app.post('/placeOrder',(req,res) => {
    db.collection('orders').insert(req.body,(err,result) => {
        if(err) throw err;
        res.send('Order Placed')
    })
})

// View order
app.get('/viewOrder',(req,res) => {
    let email = req.query.email;
    let query = {};
    if(email) {
        query = {email:email}
    } else {
        query = {}
    }    
    db.collection('orders').find().toArray((err,result) => {
        if(err) throw err;
        res.send('result')
    })
})

///update order
app.put('/updateOrder/:id',(req,res) => {
    let oid = Number(req.params.id);
    db.collection('orders').updateOne(
        {orderId:oid},
        {
            $set:{
                "status":req.body.status,
                "bank_name":req.body.bank_name,
                "date":req.body.date
            }
        },(err,result) =>{
            if(err) throw err;
            res.send('Order Updated')
        }
    )
})

//delete order
app.delete('/deleteOrder/:id',(req,res) => {
    let _id = mongo.ObjectId(req.params.id);
    db.collection('orders').remove({_id},(err,result) => {
        if(err) throw err;
        res.send('Order Deleted')
    })
})

// connect with mongodb
MongoClient.connect(mongoUrl,{useNewUrlParser:true},(err,dc) => {
    if(err) console.log('Error while connecting');
    db = dc.db('sepIntern');
    app.listen(port,() => {
        console.log(`Server is running on port ${port}`)
    })
})


// output
///// Now, we can run the our own APi on our local server. //////////////////////////////////////////////////////////////////////////////////////////////////////

//  localhost:9500/location

    /*  [
            {
                "_id": "63a95f2c5fe6342645291eca",
                "location_id": 1,
                "location_name": "Ashok Vihar Phase 3, New Delhi",
                "state_id": 1,
                "state": "Delhi",
                "country_name": "India"
            },
            {
                "_id": "63a95f2c5fe6342645291ecb",
                "location_id": 4,
                "location_name": "Bibvewadi, Pune",
                "state_id": 2,
                "state": "Maharashtra",
                "country_name": "India"
            },
            {
                "_id": "63a95f2c5fe6342645291ecc",
                "location_id": 8,
                "location_name": "Jeevan Bhima Nagar, Bangalore",
                "state_id": 3,
                "state": "Karnataka",
                "country_name": "India"
            },
            {
                "_id": "63a95f2c5fe6342645291ecd",
                "location_id": 13,
                "location_name": "Sector 40, Chandigarh",
                "state_id": 4,
                "state": "Punjab",
                "country_name": "India"
            }
        ]
    */
//

// localhost:9500/mealType

    /*  [
            {
                "_id": "63aa897692c4efca7fa75c09",
                "mealtype_id": 1,
                "mealtype": "Breakfast",
                "content": "Start your day with exclusive breakfast options",
                "meal_image": "https://i.ibb.co/FVhSTWK/breakfast.jpg"
            },
            {
                "_id": "63aa897692c4efca7fa75c0a",
                "mealtype_id": 2,
                "mealtype": "Lunch",
                "content": "Start your day with exclusive breakfast options",
                "meal_image": "https://i.ibb.co/8rPxkWP/lunch.jpg"
            },
            {
                "_id": "63aa897692c4efca7fa75c0b",
                "mealtype_id": 3,
                "mealtype": "Dinner",
                "content": "Start your day with exclusive breakfast options",
                "meal_image": "https://i.ibb.co/XjzPqYv/dinner.jpg"
            },
            {
                "_id": "63aa897692c4efca7fa75c0c",
                "mealtype_id": 4,
                "mealtype": "Snacks",
                "content": "Start your day with exclusive breakfast options",
                "meal_image": "https://i.ibb.co/wchCHfb/snacks.jpg"
            },
            {
                "_id": "63aa897692c4efca7fa75c0d",
                "mealtype_id": 5,
                "mealtype": "Drinks",
                "content": "Start your day with exclusive breakfast options",
                "meal_image": "https://i.ibb.co/YR0S6fV/drinks.jpg"
            },
            {
                "_id": "63aa897692c4efca7fa75c0e",
                "mealtype_id": 6,
                "mealtype": "NightLife",
                "content": "Start your day with exclusive breakfast options",
                "meal_image": "https://i.ibb.co/q1fC2jW/nightlife.jpg"
            }
        ]
    */

//////  To run our Api url on live server we need to update/upload on mongodb database.  /////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*  
    Data is the part of database.

    Api is created with the help of Node and express.
*/


/*
    How to place the order (POST)
    - List of all order
    - List of all order wrt to email
    - Update the order (PUT)
    - Delete the order (Delete) 

    we cannot test the order through browser
    we need a tool called "POSTMAN"

    for posting -
    we need a tool Postman to post an API. using app.post

    for testing -
    we need app.get to test an API in our browser.

*/



