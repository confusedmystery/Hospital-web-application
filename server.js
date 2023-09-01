require('dotenv').config()//this loads all environment variables,to access environment variables


const path=require("path")
const express=require('express')
const app=express()
const bcrypt=require("bcryptjs")
const querystring = require('querystring');
//viewsapp.use(express.static('public'))

app.use(express.static('public'))
app.use(express.static(__dirname + 'public'))
app.set('views','./views')
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
//database
const mongoose=require('mongoose')
mongoose.set('strictQuery', false)


mongoose.connect(process.env.DATABASE_URL,{  //connect to database
    useNewUrlParser:true,useUnifiedTopology:true
    
})

const db= mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.error('connected to database'))

//mongoose.set('strictQuery', true);
app.use(express.json())//middelware , server accepts json as body
/*app.get('/graph1',(req,res)=>{   //to test
    res.render('index')
})*/
const getDataRouter=require('./routes/getData')//
app.use('',getDataRouter)//http://192.168.71.177:3000/getData this url goes into getDataRouter

// app.get('/addpatient',(req,res)=>{   //to test
//     res.render('addPatient')

// })
// app.get('/addroom',(req,res)=>{   //to test
//     res.render('addroom')

// })
// app.get('/home',(req,res)=>{   //to test
//     res.render('home')

// })
// app.get('/login',(req,res)=>{   //to test
//     res.render('login')

// })
 app.get('/card',(req,res)=>{   //to test
    res.render('card')

 })
 app.get('/sample',(req,res)=>{   //to test
    res.render('sample')

 })
app.listen(3030,()=>console.log('server started'))

