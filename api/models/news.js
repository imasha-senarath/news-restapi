const MongoClient  = require('mongoose');

const newsSchema = MongoClient.Schema({
    _id: MongoClient.Schema.Types.ObjectId,
    title: { type: String, required: true},
    description: { type: String, required: true},
    newstype: { type: String, required: true},
    date: { type: String, required: true}
});

module.exports = MongoClient.model('News', newsSchema);