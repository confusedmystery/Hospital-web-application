const mongoose= require('mongoose')


const ctAssignSchema=new mongoose.Schema({
    caretaker:{
        type:String
       // required:true
    },
     
    patient:{
        type:String
    }
     
})

module.exports=new mongoose.model("caretaker",ctAssignSchema)