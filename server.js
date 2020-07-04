//DEPENDENCIES
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();

app.get('/', (req, res) => {
    res.send('Hello World')
})

//GLOBALS
const PORT = process.env.PORT || 8000
const johnsController = require('./controllers/johnsupholstery.js')
const db = mongoose.connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://heroku_q0vh3fwh:t6hln4ee7c9q9ic41p51msj9na@ds161345.mlab.com:61345/heroku_q0vh3fwh'
const whitelist = ['http://localhost:1985']
const corsOptions = {
    origin: function (origin, callback){
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else{
            callback(new Error('Not allowed by CORS'))
        }
    }
}


//DATABASE CONNECT
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
db.on('open', () => {
    console.log('Mongo is Connected')
})

//MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use('/johnsupholstery', johnsController)

//LISTENER
app.listen(PORT, () =>{
    console.log(`listening on port ${PORT}`)
})