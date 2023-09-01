const mongoose= require('mongoose')
const current = new Date();

const time = current.toLocaleTimeString("en-US", {
  hour: "2-digit",
 minute: "2-digit",
  hour12: false
});
const day = current.getDate();
const month = current.getMonth() + 1;
const year = current.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
const currentDate = year + "-" + month.toString().padStart(2, "0") + "-" + day.toString().padStart(2, "0");

const discreteTemparatureSchema= new mongoose.Schema({
    // createdDay: {
    //     type:  String,
    //     default:currentDate
    //   }

  //   patient_Id:{
  //    type:String,
  //     // default:1002
  //    // required:true
  //  },
    Device_name:{
      type:String,
      default:1002
    // required:true
  },
   Temparature:[{
   
   value:{
       type:String,
     // required:true
   },
    createdDay: {
     type:  String,
       default:currentDate
    },
       
    
       createdAt:{
             type: String,
         // required:true,
           default: time
      }
}]
   }
 

)



module.exports=mongoose.model("discrete",discreteTemparatureSchema)