require('dotenv').config();
const mysqlConfig = require('../database/mysqldb')
const cronJob = require('../cron-job');

const moment = require('moment');



exports.test = (req, res) => {

  try {

    let sqlQuery = `SELECT *,
    Date_Format(createdAt,'%m/%d/%Y') As Date
  FROM ${process.env.DBNAME}.tests;`
  mysqlConfig.query(sqlQuery, function (error, results, fields) {
  if(!error){
    console.log(results)
    console.log(fields)
  let output = results.filter(data=>{
  return data.Date == moment(Date.now()).format("L") && 
  (moment(Date.now()).format("h")) === moment(data.createdAt).format("h") &&
  (moment(Date.now()).format("m") - 2) <=  moment(data.createdAt).format("m")
  })
  // console.log(output)
  res.status(200).json({output, results, fields });  
}
  else{
  res.status(400).json({message: error})
  }
  });

  } catch(err){
    res.status(400).json(err);
  }
                     

};




const cron = new cronJob({test: 1})

exports.getDBManager =  (req, res) => {

   cron.getDBManager((cb) => {
    //  console.log(cb)
    res.status(200).json(cb)  
    })

};


exports.crontest = (req, res) => {


  
  // console.log(cron.getTest('test'))
  const job = cron.status();
  if(job){
    console.log('myda')
    cron.end()
    res.status(200).json({test: cron.getTest('test'), status: cron.status()})
  } else {
    console.log('waray')
    cron.start();
    console.log(cron.status())



    res.status(200).json({test: cron.getTest('test'), status: cron.status()})
  }


};

exports.crontest1 = (req, res) => {


  // const cron = new cronJob({test: "one"})
  
  // console.log(cron.getTest1('test'))

  res.status(200).json({test: cron.getTest1('test'), status: cron.status()})

};