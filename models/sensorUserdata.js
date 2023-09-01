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

const sensorUserSchema=new mongoose.Schema({
    createdDay: {
        type:  String,
        default:currentDate
      },
    RoomId:{
        type:String,
       // required:true
    },
    patient_Id:{
        type:String,
      // required:true
    },
    Device_name:{
      type:String,
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
  ,
    is_card:{
      type:Number,
      default:0
   }
})

module.exports=new mongoose.model("sensorUser",sensorUserSchema)

// Temperature:{
//     type:String,
//     Time:time,
//     Date:Date.now,
//    // required:true
//    default: null
// },