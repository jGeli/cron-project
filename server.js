require('dotenv').config();
const path = require('path');
const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

// database
const db = require("./models");
const Test = db.test;

db.sequelize.sync(
    // {force: true}
    ).then(() => { 
    // init();
    
  })
  .catch(err => {
      console.log(err)
  })


// simple route
require('./routes/auditLog.route')(app);


app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is running on port 3000`)
})