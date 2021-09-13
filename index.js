const express = require('express');
const app = express();
const PORT = 5000||process.env.PORT;
const dbconnection = require('./dbConnection');
const authrouters = require('./routers/auth')

dbconnection();

// db connection

app.use(express.json());//this middleware used to get req.body


app.get('/',(req,res)=>res.send("hello"));
app.use('/user',authrouters);








app.listen(PORT,()=>console.log(`listening backend at port:${PORT}`));
