const express = require('express');
const app = express();
const mongodb = require('./database/connect')
const static = require("./routes/static")
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const port = process.env.PORT

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(static)
app.use(express.static(__dirname + '../public'));
app.use('/', require('./routes/index') )
mongodb.initDb((err) => {
    if(err){
        console.log(err)
    }else{
        app.listen(port, () => {
            console.log(`Running on port ${port}`)
        })
    }
})