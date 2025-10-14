const mongoose = require('mongoose');


const connectDB=async()=>{
    try{
      await mongoose.connect(process.env.mongoDB_url)
        console.log("Database connected successfully")
    }
    catch(err){
        console.log("Database not connected")
        console.log(err)
    }
}

module.exports=connectDB