const mongoose = require('mongoose');
const schema = mongoose.Schema;



const registerSchema= new schema({
    name:{
        type : String,
        required : true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    role:{
        type:String,
        default: 'customer'
    }
    
   
});

module.exports=  mongoose.model('login',registerSchema,'login');