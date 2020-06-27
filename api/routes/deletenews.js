const express = require('express');
const router = express.Router();
const MongoClient = require('mongoose');

const News = require('../models/news');

//handle incoming DELETE request
router.delete('/:newsId',(req, res, next) =>{
   const id = req.params.newsId;
   News.remove({_id: id})
   .exec()
   .then(result => {
        res.status(200).json({
         message: 'News deleted successfully.'
       });
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({error: err});
   });
});


module.exports = router;