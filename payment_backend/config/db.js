const mongoose = require("mongoose");

const connect = async ()=>{
    return mongoose.connect(process.env.DOT_URL);
}

module.exports = connect;