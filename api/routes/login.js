const express = require('express');
const router = express.Router();
const MongoClient = require('mongoose');
const bcrypt = require ('bcrypt');

const User =  require('../models/user');

router.post('/',(req, res, next) => {
    //checking whether the user email exists or not
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if(user.length < 1) {
            return res.status(401).json({message: "Authentication failed"});
        }
        //comparing both passwords
        bcrypt.compare(req.body.password, user[0].password, (err, result) =>{
            if(err) {
                return res.status(401).json({message: "Authentication failed"});
            }
            if(result) {
                return res.status(200).json({message: "Authentication successful"})
            }
            res.status(401).json({message: "Authentication failed"});
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}); 

module.exports = router;