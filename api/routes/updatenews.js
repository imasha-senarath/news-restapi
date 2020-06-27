const express = require('express');
const router = express.Router();

const News = require('../models/news');

//handle incoming PATCH request
router.patch('/:newsId',(req, res, next) =>{
   const id = req.params.newsId;
   const updateOps = {};
   for (const ops of req.body) {
       updateOps[ops.propName] = ops.value;
   }
   News.update({_id: id}, {$set: updateOps})
   .exec()
   .then(result => {
       res.status(200).json({
         message: 'News updated successfully.',
       });
   })
   .catch(err => {
       console.log(err);
       res.status(500).json({error: err});
   });
});


module.exports = router;