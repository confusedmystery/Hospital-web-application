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

const TemparatureSchema= new mongoose.Schema({
  createdDay: {
    type:  String,
    default:currentDate
  },
    Temp:{
      type:String,
      required:true
  },

  createdAt:{
          type: String,
         // required:true,
          default: time
  }
  // }
 

})



module.exports=mongoose.model("temparature",TemparatureSchema)