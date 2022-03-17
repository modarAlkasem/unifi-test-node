const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema =new  Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    creator : {
        type : mongoose.Types.ObjectId,
        ref : 'User'
    }
});


moodule.exports = mongoose.model('User' , userSchema);