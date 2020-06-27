const express = require('express');
const router = express.Router();
const MongoClient = require('mongoose');

const News = require('../models/news');

//handle incoming GET request
router.get('/',(req, res, next) =>{
   News.find()
   .select('title description newstype date _id') //Avoiding other entities
   .exec()
   .then(doc => {
       console.log(doc);
       res.status(200).json(doc);
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({error: err});
   });
});


//handle incoming GET request for one single news
router.get('/:newsId',(req, res, next) =>{
    const id = req.params.newsId; //getting requested news ID
    News.findById(id)
    .select('title description newstype date _id') //Avoiding other entities
    .exec()
    .then(doc => {
        console.log("From database", doc);
        if(doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No valid entry found'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
     })
});

module.exports = router;