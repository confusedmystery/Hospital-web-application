const mongoose= require('mongoose')


const newRoomSchema=new mongoose.Schema({
    roomId:{
        type:String
       // required:true
    }


})

module.exports=new mongoose.model("room",newRoomSchema)