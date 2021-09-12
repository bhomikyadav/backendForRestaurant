const express = require('express');
const app = express();
const PORT = 5000||process.env.PORT;
const dbconnection = require('./dbConnection');

dbconnection();

// db connection




app.get('/',(req,res)=>res.send("hello"));







app.listen(PORT,()=>console.log(`listening backend at port:${PORT}`));
