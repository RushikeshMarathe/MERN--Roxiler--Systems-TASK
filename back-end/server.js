const express = require('express');
require("dotenv").config();
const cors = require('cors');
const dbConnect = require("./config/database");
const apiRoute = require("./route/apiRoutes")

//initialize the express instance
const app = express();



// middleware 
app.use(express.json());
app.use(cors());


//connect to database
dbConnect.connect();

//Routes
app.use("/api/v1",apiRoute);


PORT = process.env.PORT || 4000;

// start server

app.listen(PORT, () => {
    console.log(`Server is running on  port ${PORT}`);
});