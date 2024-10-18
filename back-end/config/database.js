const mongoose = require("mongoose");

exports.connect = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        useUnifiedTopology:true,
        useNewUrlParser:true,
    })
    .then(() =>{
        console.log("DATABASE CONNECTION SUCCESSFULLY!..");
    
    })
    .catch((error) =>{
        console.log("ERROR FACED IN DATABASE CONNECTION !!");
        console.error(error);
        process.exit(1);
    })
}