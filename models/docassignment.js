const mongoose= require('mongoose')


const docAssignSchema=new mongoose.Schema({
    doctor:{
        type:String
       // required:true
    },
     
    patient:{
        type:String
    }
     
})

module.exports=new mongoose.model("doctor",docAssignSchema)



  