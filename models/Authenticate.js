const mongoose=require('mongoose')

const  AuthenticateSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide a name"]
    },
     email:{
        type:String,
        required:[true,"Please provide a email"]
    },
     password:{
        type:String,
        required:[true,"Please provide a password"]
    }

})

const Authenticate=mongoose.model('Authenticate',AuthenticateSchema)

 module.exports=Authenticate