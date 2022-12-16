require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
// const connect = require("../config/db");
const razorRoute = require("../routes/razor.routes");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/razor",razorRoute)

app.get("/",(req,res)=>{
    res.send("hello world");
})

app.listen(PORT,async()=>{
    // await connect();
    console.log(`http://localhost:${PORT}`);
})

// key = rzp_test_OQKrEa4efQDotc
// secret_key = iZsXHv0kiuCsgO7dp4bbceMj
