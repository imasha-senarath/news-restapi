const express = require('express');
const router = express.Router();
const MongoClient = require('mongoose');

const News = require('../models/news');


//handle incoming POST request
router.post('/',(req, res, next) =>{
    const news  = new News({
        _id: new MongoClient.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        newstype: req.body.newstype,
        date: req.body.date
    });
    news.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: 'News added successfully.',
            addedNews : {
                _id: result.id, 
                title: result.title,
                description: result.description,
                newstype: result.newstype,
                date: result.date
            }
        });
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({error: err});
    });
});


module.exports = router;