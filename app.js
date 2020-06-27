const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
const MongoClient  = require('mongoose');

//importing routes
const getNewsRoutes = require('./api/routes/getnews');
const addNewsRoutes = require('./api/routes/addnews');
const deleteNewsRoutes = require('./api/routes/deletenews');
const updateNewsRoutes = require('./api/routes/updatenews');
const registerRoutes = require('./api/routes/register');
const loginRoutes = require('./api/routes/login');

//mongo online database connection
MongoClient.connect('mongodb+srv://ImashaSenarath:'+ process.env.MONGO_ATLAS_PW +'@newsapplication-vqb4h.mongodb.net/test?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//CORS handling
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({})
    }
    next();
})

//request handle routes
app.use('/getnews', getNewsRoutes);
app.use('/addnews', addNewsRoutes);
app.use('/deletenews', deleteNewsRoutes);
app.use('/updatenews', updateNewsRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);

//errors handling
app.use((req, res, next) =>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})
app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

module.exports = app; 