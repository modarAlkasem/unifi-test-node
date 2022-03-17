const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv').config();

const authRoutes = require('./routes/auth');
const todoRoutes = require('./routes/todo');

const MONGODB_URI = process.env.MONGODB_ATLAS_URI;


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers' , 'Authorization,Content-Type');
    next();
});

app.use(bodyParser.json());
app.use('/api/auth' ,authRoutes);
app.use('/api/feed',todoRoutes);



app.use((error, req, res, next)=>{
    const errorMessage = error.message;
    const errorCode = error.statusCode || 500;
    const errorData = error.data?error.data:errorMessage;
    res.status(errorCode).json({
        message : errorMessage,
        data : errorData
    })

})

 mongoose.connect(MONGODB_URI)
    .then(()=>{
        console.log('connected!')
        app.listen(8080);
    })

