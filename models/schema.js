const mongoose = require('mongoose');

// defining schema
const studentSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        minlength:3
    },
    rollno:{
        type:Number,
        unique:true,
        required:true
    },
    math:{
        type:Number,
        required:true
    },
    physics:{
        type:Number,
        required:true
    },
    chemistry:{
        type:Number,
        required:true
    },
    english:{
        type:Number,
        required:true
    },
    hindi:{
        type:Number,
        required:true
    }
    
})

// making model 

const Reportcard = new mongoose.model('reportcard',studentSchema)

// expoting model
module.exports = Reportcard