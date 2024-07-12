const express = require('express');
const app = express();
const dotenv = require('dotenv')
const port = process.env.PORT

app.listen(port, () =>{
    console.log(`Running in port ${port}`);
})