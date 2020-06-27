const MongoClient  = require('mongoose');

const userSchema = MongoClient.Schema({
    _id: MongoClient.Schema.Types.ObjectId,
    email: { type: String, required: true},
    password: { type: String, required: true}
});

module.exports = MongoClient.model('User', userSchema);