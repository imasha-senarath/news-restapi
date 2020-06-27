const express = require('express');
const router = express.Router();
const MongoClient = require('mongoose');
const bcrypt = require ('bcrypt');

const User =  require('../models/user');

router.post('/',(req, res, next) => {
    //checking whether the user exists or not
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length >= 1) {
            return res.status(409).json({message: "Email exists"});
        } else {
            //password encrypting with bcrypt
            bcrypt.hash(req.body.password, 10, (err, hash) => 
            {
                if(err) {
                return res.status(500).json({error: err})
                } 
                else {
                    const user = new User({
                         _id: new MongoClient.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    });
                    user.save()
                    .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: "Register successful"
                        });
                    })
                    .catch(err => {
                    console.log(err);
                    res.status(500).json({error: err});
                    });
                }
            });
        }
  })
})

module.exports = router;