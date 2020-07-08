const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const dotenv = require('dotenv')
const morgan = require('morgan')
const Bodyparser = require('body-parser')

//importing the routes
const index = require('./routes/index')
const about = require('./routes/about')

//load Config
dotenv.config({path: './config/config.env'})

//Connecting to mongo DB
mongoose.connect('mongodb://127.0.0.1:27017/storybooks',{useNewUrlParser: true, useUnifiedTopology: true }).then((err)=>{
  if(err){
    console.log(err)
  }else{
    console.log('connected to database succesfully...')
  }
})
mongoose.set('useCreateIndex', true);
var db = mongoose.createConnection;

//app init
const app = express()

//morgan
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//View engine
app.set('views',path.join(__dirname ,'views'))
app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs')


//initializing the routes to the App
app.use('/',index)
app.use('/about',about)

const PORT = process.env.PORT || 5000
app.listen(PORT,(err)=>{
    if (err) {
        console.log(err)
    } else {
        console.log(`Server running on port${PORT}`)
    }
})