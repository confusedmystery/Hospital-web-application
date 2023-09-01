const mongoose= require('mongoose')
const bcrypt = require("bcryptjs");
const newuserSchema=new mongoose.Schema({
    name:{
        type:String
       // required:true
    },
    email:{
        type:String,
        unique: true
       // required:true
    },
    phone_no:{
        type:String,
        unique: true
       // required:true
    },
    address:{
        type:String
       // required:true
    },
    password:{
        type:String
       // required:true
    },
    user_type:{
        type:String
      //  required:true
    },
    unique_id:{
        type:Number,
        default:1
    },
    is_verified:{
        type:Number,
        default:0
    },
     paid:{
        type:Number,
        default:0
     },
     is_assigned_doc:{
        type:Number,
        default:0
     },
     is_assigned_ct:{
        type:Number,
        default:0
     },
     is_admin:{
        type:Number,
        default:0
     }
})
newuserSchema.pre("save", async function(next){
	if(this.isModified("password")){
	this.password=await bcrypt.hash(this.password, 10);
	this.password_two=undefined;
	}
	next()

})
module.exports=new mongoose.model("user",newuserSchema)


//module.exports=user