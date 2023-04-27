const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const USER = mongoose.model("USER");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { Jwt_secret } = require("../keys");
const requirelogin = require('../middlewares/requirelogin');



router.get('/', (req, res) => {
    res.send("hello");
})
router.get('/createPost', requirelogin,(req, res) => {
    res.send("hello auth");
})
router.post('/signup', (req,res) => {

   const {name, userName, email, password} = req.body;

    if(!name || !userName || !email || !password){
        return res.status(422).json({error : "Please add all the fields"});
    }

    USER.findOne({$or : [{email:email}, {userName : userName}]})
        .then(savedUser => {
            if(savedUser)
            {
                return res.status(422).json({error: "user already exists"});
    
            }

            bcrypt.hash(password, 12) .then(hashedPassword => {
                const user = new USER({
                    name,
                    userName,
                    email,
                    password:hashedPassword
                    });
                
                user.save()
                    .then(user => {res.json({message : "saved Successfully"})})
                    .catch(err => {console.log(err)});
            })
            
        })
  

})

router.post("/signin", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Please add email and password" })
    }
    USER.findOne({ email: email }).then((savedUser) => {
        if (!savedUser) {
            return res.status(422).json({ error: "Invalid email" })
        }
        bcrypt.compare(password, savedUser.password).then((match) => {
            if (match) {
                // return res.status(200).json({ message: "Signed in Successfully" })
                const token = jwt.sign({ _id: savedUser.id }, Jwt_secret)
                const { _id, name, email, userName } = savedUser

                res.json({ token, user: { _id, name, email, userName } })

                console.log({ token, user: { _id, name, email, userName } })
            } else {
                return res.status(422).json({ error: "Invalid password" })
            }
        })
            .catch(err => console.log(err))
    })
})
module.exports = router;