let express = require('express');
let router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../model/userModel');

router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

//get All user
router.get('/users',(req,res) => {
    User.find({},(err,data) => {
        if(err) throw err;
        res.send(data)
    })
})

//register user
router.post('/register',(req,res) => {
    let hashpassword = bcrypt.hashSync(req.body.password, 8);
    User.create({
        name:req.body.name,
        email:req.body.email,
        password:hashpassword,
        phone:req.body.phone,
        role:req.body.role?req.body.role:'User'
    },(err,data) => {
        if(err) res.send('Error While Register');
        res.send('Registration Successful');
    })
})

//loginUser
router.post('/login',(req,res) => {
    User.findOne({email:req.body.email},(err,user) => {
        if(err) res.send({auth:false,token:'Error while login'})
        if(!user) res.send({auth:false,token:'No User Found'})
        else{
            const passIsValid = bcrypt.compareSync(req.body.password,user.password);
            if(!passIsValid)  res.send({auth:false,token:'Invalid Password'})
            // in case both valid
            let token = jwt.sign({id:user._id},config.secret,{expiresIn:86400}) //24hr
            res.send({auth:true,token:token})
        }
    })
})

//userInfo
router.get('/userInfo',(req,res) => {
    let token = req.headers['x-access-token'];
    if(!token) res.send({auth:false,token:'No Token Provided'})
    //jwt verify
    jwt.verify(token,config.secret,(err,user) => {
        if(err) res.send({auth:false,token:'Invalid Token'})
        User.findById(user.id,(err,result) => {
            res.send(result)
        })
    })
})


module.exports = router;

// 


/// To run this : steps :

/*
Open loginapp folder and go to terminal >

PS D:\EDUREKA\Full Stack\NodeJS Edureka\loginapp> npm init -y

Packages required :
PS D:\EDUREKA\Full Stack\NodeJS Edureka\loginapp> npm i express body-parser bcryptjs cors jsonwebtoken mongoose

Run dev :
PS D:\EDUREKA\Full Stack\NodeJS Edureka\loginapp> npm run dev

> loginapp@1.0.0 dev
> nodemon app.js

[nodemon] 2.0.20
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node app.js`
(node:7364) [MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
(Use `node --trace-deprecation ...` to show where the warning was created)
listening on port 5000

*/