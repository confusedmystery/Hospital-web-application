const express=require('express')
const session = require('express-session');
const router=express.Router()
const Data= require('../models/Data')
const userdata= require('../models/userdata')

const sensorUserdata= require('../models/sensorUserdata')
const bcrypt = require("bcryptjs")
const RoomId =  require('../models/roomId')
const UniqueId= require('../models/uniqueId')
const DeviceId= require('../models/deviceId')
const nodemailer=require("nodemailer");
const DocAssign= require('../models/docassignment')
const CtAssign= require('../models/ctassign')
const sensorData=require('../models/Temperaturedata');
const deviceId = require('../models/deviceId');
const { exec } = require('child_process');
const { spawn } = require('child_process');
// const querystring = require('querystring');
// const url = require('url');

router.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

router.get('/dashboard',(req,res)=>{
    if(req.session.authenticated) {
        res.render("Dashboard", { user: req.session.user });
    } else {
        res.redirect("login");
    }
})
router.get('/docdashboard',(req,res)=>{
    if(req.session.authenticated) {
        res.render("docDashboard", { user: req.session.user });
    } else {
        res.redirect("login");
    }
})
router.get('/ctdashboard',(req,res)=>{
    if(req.session.authenticated) {
        res.render("ctDashboard", { user: req.session.user });
    } else {
        res.redirect("login");
    }
})
router.get('/patientdashboard',(req,res)=>{
    if(req.session.authenticated) {
        res.render("patientdashboard", { user: req.session.user });
    } else {
        res.redirect("login");
    }
})
 router.get('/Temparaturegraph',(req,res)=>{
//     const queryParams = querystring.parse(req.query);
//    // const queryParams = req.query;
//    const name = queryParams.name;
       // console.log(req.url)
     // const name= req.query.trim();
        let name=(req.query.name)
         //name=name.trim()
        //const name = queryParams.name
        //const decodedName = decodeURIComponent(name)
       // const query = querystring.parse(parsedUrl)
       // console.log(decodedName)
// const queryParams = url.parse(req.url, true).query;
// const name = queryParams.name;
// const decodedName = decodeURIComponent(name);
//    
    //res.json(name);
     res.render('TempGraph',{name})
 })


  // Access the decoded data as needed


router.get('/addpatient',(req,res)=>{   //to test
    res.render('addPatient')

})
router.get('/addroom',(req,res)=>{   //to test
    res.render('addroom')

})
router.get('/home',(req,res)=>{   //to test
    res.render('home')

})
router.get('/login',(req,res)=>{   //to test
    
    res.render('login')

})
router.get('/signin',(req,res)=>{   //to test
    res.render('signup')

})
router.get('/paid',(req,res)=>{   //to test
    res.render('feespay')

})
router.get('/view',(req,res)=>{   //to test
    if(req.session.authenticated) {
        res.render("view", { user: req.session.user });
    } else {
        res.redirect("login");
    }

})
router.get('/uniqueId',(req,res)=>{   //to test
    res.render('createuniqueId')

})
router.get('/assign',(req,res)=>{   //to test
    res.render('assign')

})
router.get('/patientsList',(req,res)=>{  
    if(req.session.authenticated) {
        res.render("patientList");
    } else {
        res.redirect("/login");
    }
});
router.get('/doctorsList',(req,res)=>{  
    if(req.session.authenticated) {
        res.render("doclistctlist");
    } else {
        res.redirect("/login");
    }
});

router.get('/data',async(req,res)=>{
 try{
    const temp= await Data.find()
    res.json(temp)
 }catch(err){
    res.status(500).json({message:err.message})

 }
})


// router.post('/TemparatureGraph',(req,res)=>{
//     let CurrentUser=req.body.sendUser;
//     console.log(CurrentUser)
    
//         res.send("hello")
 
 
     

// //{ currentuser:CurrentUser }


 
// })

router.post('/getData',async(req,res)=>{
    const temp= new Data({
        createdDay:req.body.createdDay,
        Temp: req.body.Temp,
        createdAt: req.body.createdAt
    })
    try{
        const newtemp=await temp.save()
        res.json(newtemp)
        console.log(newtemp.Temp)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

router.post("/signup",async(req,res)=>{
    try{
    const user= new userdata({
        // Date:req.body.Date,
        name: req.body.name,
        email: req.body.email,
        phone_no: req.body.phone_no,
        address: req.body.address,
        password: req.body.password,
        user_type: req.body.user_type,
        unique_id: req.body.unique_id,
       
    })
      
    // console.log(req.body.unique_id)
    if(req.body.user_type==="Doctor"||req.body.user_type==="Caretaker"){
        const isMatch= await UniqueId.findOne({uniqueId: req.body.unique_id})
        if(isMatch)
            {
               
                const newuser=await user.save()
                const update= await userdata.updateOne({email:req.body.email},{ $set:{ paid:1 } });
                //console.log(req.body.email);
                sendVerifyMail(req.body.name, req.body.email,newuser._id);
               
                res.status(201).render("login",{message:"Your registration has been successfully, Please verify your mail."});
            }
            else{
                res.status(400).json({message:"Wrong unique Id"})
            }
    }

    else{
    const newuser=await user.save()
   
    sendVerifyMail(req.body.name, req.body.email,newuser._id);
   
    res.status(201).render("login",{message:"Your registration has been successfully, Please verify your mail."});
    }
         // res.json(newuser)
    //     // console.log(newtemp.Temp)
     }catch(err){
       res.status(400).json({message:err.message})
     }
    //await userdata.insertMany([user])
    
})
    const sendVerifyMail = async(name, email, userId)=>{

        try {
             const transporter = nodemailer.createTransport({
                host:'smtp.gmail.com',
                port:587,
                secure:false,
                requireTLS:true,
                auth:{
                    user:'tayyabshaikh12131@gmail.com',
                    pass:'ocipfmzlburpxnzu'
                }
            });
            const mailOptions = {
                from:'tayyabshaikh12131@gmail.com',
                to:email,
                subject:'For Verification mail',
                html:'<p>Hii '+name+', please click here to <a href="http://localhost:3000/verify?id='+userId+'"> Verify </a>your mail.</p>'
            }
    
            transporter.sendMail(mailOptions, function(error,info){
                if(error){
                    console.log(error);
                }
                else{
                    console.log("Email has been sent:- ",info.response);
                }
            })
    
    
        } catch (error) {
            console.log(error.message);
        }
    }    
   

   // res.render("home")



router.get('/verify', async(req,res)=>{  

    try {
        
        const updateInfo = await userdata.updateOne({_id:req.query.id},{ $set:{ is_verified:1 } });

       // console.log(updateInfo);
        res.render("login",{message:"Your mail has been verified successfully."});
    
    } catch (error) {
        console.log(error.message);
    }
 });
router.get('/loginverify',async(req,res)=>{
    try{
       const user= await userdata.find()
       console.log(res.json(user))
    }catch(err){
       res.status(500).json({message:err.message})
   
    }
   })



   router.post("/login", async (req, res) => {
    try{
        const email=req.body.email;
        const password=req.body.password;


        const useremail=await userdata.findOne({email:email});
      
        const isMatch= await bcrypt.compare(password,useremail.password);

        if(useremail.is_verified)
        {
            if(isMatch&&useremail. is_admin){
            req.session.authenticated = true;
            req.session.user = useremail;
           // console.log( req.session.user)
            res.render("Dashboard");
         }
             
         else if(isMatch&&(useremail. user_type==="Doctor")){
          req.session.authenticated = true;
          req.session.user = useremail;
                // console.log( req.session.user)
             res.redirect("docDashboard");
           }
           else if(isMatch&&(useremail.user_type==="Caretaker")){
            req.session.authenticated = true;
            req.session.user = useremail;
                  // console.log( req.session.user)
               res.redirect("ctDashboard");
             }
             else if(isMatch&&(useremail.user_type==="Patient")){
                req.session.authenticated = true;
                req.session.user = useremail;
                      // console.log( req.session.user)
                   res.redirect("patientdashboard");
                 }

        else
        {

            res.send("wrong password");
        }
    }
        else
        {
            res.send(" Please verify your mail before logging in ");
        }
    }catch(error){
        res.status(400).send("invalid email")
    }
 });


  
  router.get('/logout',(req,res)=>{
    try {
        req.session.destroy();
        res.redirect('login');
     } catch (error) {
         res.status(400).send(error);
     }

       
    })
   // res.render('login')
   router.post('/connect',async(req,res)=>{

    const sensorUser= new sensorUserdata({
        // Date:req.body.Date,
        RoomId: req.body.RoomId,
        patient_Id: req.body.patient_Id,
        Device_name:req.body.Device_name,

        
    })
    
        
 
     try{
        const newsensorUser=await sensorUser.save()
       

       // res.status(200)
         // res.json(newuser)
    //     // console.log(newtemp.Temp)
     }catch(err){
       res.status(400).json({message:err.message})
     }
    //await userdata.insertMany([user])   
})
// router.post('/connectsensor',async(req,res)=>{
    router.post('/connectsensor', async (req, res) => {
        try {
            const Device_name=req.body.deviceId;
            const object1=req.body.value;
            const findDevice=await sensorData.findOne({ Device_name:Device_name});
          if(findDevice)
          {
           // const { value } = req.body;
      
          
           // Create a new temperature object with the given value
           sensorData.updateOne(
            {  Device_name:deviceId },
            { "$push": { " Temparature": {  object1  }}}
          );
        //   const temperature = new sensorData({ 
        //     Device_name: deviceId,
        //     Temparature:[{
        //         value:req.body.value
        //    } ]

        //    });
      
          // Save the temperature object to the database
          //const savedTemperature = await temperature.save();
          //res.status(201).json(savedTemperature);
          }
            
         
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error' });
        }
      });
     // Import the child_process module
// Restart the server function
const restartServer = () => {
    console.log('Restarting server...');
  
    // Send the SIGUSR2 signal to nodemon
    exec('killall -SIGUSR2 nodemon');
  };

// Call the restartServer function


// Restart the server function
// const restartServer = () => {
//   console.log('Restarting server...');

//   // Get the current process ID
//   const pid = process.pid;

//   // Kill the current process
//   process.kill(pid, 'SIGTERM');

//   // Spawn a new process to start the server
//   const child = spawn(process.argv[0], process.argv.slice(1), {
//     detached: true,
//     stdio: 'ignore',
//   });

//   // Unref the child process
//   child.unref();
// };

// Call the restartServer function
//restartServer();


      router.post('/sensorconnect', async (req, res) => {
        // Import the child_process module


// Call the restartServer function

        try {
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
            


          //  restartServer();
           // restartServer();
           const Device_name=req.body.deviceId
           const object1 = { value:req.body.value ,
           createdDay:currentDate ,
           createdAt:time
        };
           console.log(object1);
            //const findDevice=await sensorData.findOne({ Device_name:Device_name});
          //if(findDevice)
//  sensorData.insertMany({
//   Device_name: 187,
//              Temparature: [20,28,89]
//     });
           // const { value } = req.body;
          
          // process.exit(1)
           // Create a new temperature object with the given value
        //  
        const updateinfo= await sensorUserdata.updateOne(
            { Device_name: Device_name},
            {
            
                 $push: {
                    Temparature: [object1]
                       
                 }
                       
                 }
                
         );
        //   const temperature = new sensorData({ 
        //     Device_name: deviceId,
        //     Temparature:[{
        //         value:req.body.value
        //    } ]

        //    });
      
          // Save the temperature object to the database
          //const savedTemperature = await temperature.save();
          //res.status(201).json(savedTemperature);
          
            
         
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error' });
        }
      });
//     const sensorUser= new sensordata({
//         // Date:req.body.Date,
//         // RoomId: req.body.RoomId,
//         // Id_name: req.body.Id_name,
//         Device_name:req.body.Device_name,

//         Temperature:[
//             createdDay:req.body.createdDay,
//         ] ,
//         Temperature: req.body.value,
       

        // Humidity: req.body.value,
        // Humidity: req.body.Time,
        // Humidity: req.body.Date,

        // Position: req.body.value,
        // Position: req.body.Time,
        // Position: req.body.Date,

        // {

        //     lat: Number,
      
        //     lng: Number
      
        //   },

//     })
//      try{
//         const newsensorUser=await sensorUser.save()
//        // res.status(200)
//          // res.json(newuser)
//     //     // console.log(newtemp.Temp)
//      }catch(err){
//        res.status(400).json({message:err.message})
//      }
//     //await userdata.insertMany([user])   
// })


router.get('/sensorUserdata',async(req,res)=>{
    try{
       const userSensor= await sensorUserdata.find()
       res.json(userSensor)
    }catch(err){
       res.status(500).json({message:err.message})
   
    }
   })
   router.get('/getdoctodash',async(req,res)=>{
    try{
       const doctors= await DocAssign.find()
       res.json(doctors)
    }catch(err){
       res.status(500).json({message:err.message})
   
    }
   })
   router.get('/getcttodash',async(req,res)=>{
    try{
       const caretakers= await CtAssign.find()
       res.json(caretakers)
    }catch(err){
       res.status(500).json({message:err.message})
   
    }
   })

   router.get('/users',async(req,res)=>{
    try{
       const users= await userdata.find()
       res.json(users)
    }catch(err){
       res.status(500).json({message:err.message})
   
    }
   })
   router.post('/createRoom',async(req,res)=>{
    const room= new RoomId({
       
        roomId: req.body.roomId,
      
    })
    try{
        const newroomId=await room.save()
        res.json(newroomId)
       // console.log(newtemp.Temp)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})
router.get('/getroomId',async(req,res)=>{
    try{
       const rooms= await RoomId.find()
       res.json(rooms)
    }catch(err){
       res.status(500).json({message:err.message})
   
    }
   })

   router.post('/getPatientsdoc', async(req, res) => {
    
    let payload=req.body.payload.trim();
    //console.log(payload);
    let search=await userdata.find({name: {$regex: new RegExp('^'+payload+'/*','i')},paid:1,is_assigned_doc:0,user_type:"Patient"}).exec();
    search=search.slice(0,10);
    res.send({payload:search});
});
router.post('/getPatientsct', async(req, res) => {
    
    let payload=req.body.payload.trim();
    //console.log(payload);
    let search=await userdata.find({name: {$regex: new RegExp('^'+payload+'/*','i')},paid:1,is_assigned_ct:0,user_type:"Patient"}).exec();
    search=search.slice(0,10);
    res.send({payload:search});
});
router.post('/getDoctors', async(req, res) => {
    
    let payload=req.body.payload.trim();
    //console.log(payload);
    let search=await userdata.find({name: {$regex: new RegExp('^'+payload+'/*','i')},user_type:"Doctor"}).exec();
    search=search.slice(0,10);
    res.send({payload:search});
});
router.post('/getCaretakers', async(req, res) => {
    
    let payload=req.body.payload.trim();
    //console.log(payload);
    let search=await userdata.find({name: {$regex: new RegExp('^'+payload+'/*','i')},user_type:"Caretaker"}).exec();
    search=search.slice(0,10);
    res.send({payload:search});
});
router.post('/createuniqueId',async(req,res)=>{
    const uniqueId= new UniqueId({
       
        uniqueId: req.body.uniqueId,
      
    })
    try{
        const newuniqueId=await uniqueId.save()
        //res.json(newuniqueId)
        res.render("createuniqueId")
       // console.log(newtemp.Temp)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

router.post('/createdeviceId',async(req,res)=>{
    const deviceId= new DeviceId({
       
        deviceId: req.body.deviceId,
      
    })
    try{
        const newdeviceId=await deviceId.save()
        res.json(newdeviceId)
       // console.log(newtemp.Temp)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})
router.get('/getdeviceId',async(req,res)=>{
    try{
       const devices= await DeviceId.find()
       res.json(devices)
    }catch(err){
       res.status(500).json({message:err.message})
   
    }
   })
   router.get('/view',(req,res)=>{   
    if(req.session.authenticated) {
        res.render("view", { user: req.session.user });
    } else {
        res.redirect("login");
    }
});

router.get('/edit', async (req,res)=>{
    try {
      // 

      // const user = getUser(req).then(console.log(user,'user'))

        if (req.session && req.session.user) {
            
            const user = await userdata.findOne({ email: req.session.user.email });
            console.log('still logged in');
            // console.log(req.session.user);
            console.log(user);
            res.render("edit", { user });
            }
      // if(req.session && req.session.user){
      //   Register.findOne({ email: req.session.email }).then(user => {
      //       console.log(user , 'user acquired');
      //       res.render('edit',{user})
      //   }).catch(e => console.log('error',e))
      // }
        else
        {
            console.log('Not logged in');
        }
        
   
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/update', async(req, res) => {
    try {
        const userId = req.session.user._id;
        const user = await userdata.findById(userId);
        console.log(user);
        console.log(userId);
        if (!user) {
            return res.status(400).send("User not found");
        }

        user.name = req.body.name;
        user.email=req.body.email;
        user.phone_no = req.body.phone_no;
        user.address = req.body.address;
        console.log(req.body.email);

        const updatedUser = await user.save();
        res.redirect('/edit')
    } catch (error) {
        console.log('error in update');
        res.status(400).send(error);
    }
});
router.post('/docassign',async(req,res)=>{
    const docassign= new DocAssign({
       
        
        patient: req.body.patient,
        doctor: req.body.doctor,
      
    })
    try{

        const newdocassign=await docassign.save()
      //  const update= await userdata.updateOne({patient:req.body.patient},{ $set:{ is_assigned_doc:1 } });
        //res.json(newuniqueId)
        res.render("assign")
       // console.log(newtemp.Temp)
    }catch(err){
        res.status(400).json({message:err.message})
    }
})
router.post('/ctassign',async(req,res)=>{
    const ctassign= new CtAssign({
       
       
        patient: req.body.patient,
        caretaker: req.body.caretaker,
      
    })
    try{
        const newctassign=await ctassign.save()
        //const update= await userdata.updateOne({patient:req.body.patient},{ $set:{ is_assigned_ct:1 } });
        //res.json(newuniqueId)
        res.render("assign")
       // console.log(newtemp.Temp)
    }catch(err){
        res.status(400).json({message:err.message})
    }

})
router.get('/PatientLists',async(req,res)=>{
    try{
        const users = await userdata.find({ paid: 1, is_verified: 1,user_type: "Patient"});
        res.json(users)
    }catch(err){
       res.status(500).json({message:err.message})
    }
});

router.get('/ctList',async(req,res)=>{
    try{
        const users = await userdata.find({  is_verified: 1,user_type: "Caretaker"});
        res.json(users)
    }catch(err){
       res.status(500).json({message:err.message})
    }
});
router.get('/doctorsList',async(req,res)=>{
    try{
        const users = await userdata.find({  is_verified: 1,user_type: "Doctor"});
        res.json(users)
    }catch(err){
       res.status(500).json({message:err.message})
    }
});
module.exports=router
