const mongoose= require('mongoose')

const uniqueIdSchema=new mongoose.Schema({
    uniqueId:{
        type:String
       // required:true
    }


})

module.exports=new mongoose.model("uniqueId",uniqueIdSchema)