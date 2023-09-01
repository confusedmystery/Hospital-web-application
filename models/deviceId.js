const mongoose= require('mongoose')


const newdeviceSchema=new mongoose.Schema({
    deviceId:{
        type:String
       // required:true
    }


})

module.exports=new mongoose.model("device",newdeviceSchema)