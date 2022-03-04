require('dotenv').config();
const mysqlConfig = require('./database/mysqldb')

const moment = require('moment');


class cronJob {
    constructor(props) {
        this.state = {
            payload: {
                fields: [],
                rows: []
            },
            interval: process.env.CRON_INTERVAL || 0.5,
            db: {
                name: process.env.DBNAME,
                table: process.env.CRON_DB_TABLE,            
                field: process.env.CRON_DB_FIELD
            },
            projects: props
        }
        
    }

   async getTest(name) {
        this.state.projects[name] += 1;
        return this.state.projects[name];
    }

    getTest1(name) {

        return this.state.projects[name];
    }

   
    getDBManager(cb) {  
        const stater = this.state;
        let sqlQuery = `SELECT *,
        Date_Format(${stater.db.field},'%m/%d/%Y') As L,
        Date_Format(${stater.db.field},'%M %d %Y') As LL,
        Date_Format(${stater.db.field},'%M %d %Y %l:%i %p') As LLL,
        Date_Format(${stater.db.field},'%W, %M %d %Y %l:%i %p') As LLLL,
        Date_Format(${stater.db.field},'%l:%i %p') As LT,
        Date_Format(${stater.db.field},'%l:%i:%s %p') As LTS
  FROM ${stater.db.name}.${stater.db.table};`
  
  
  mysqlConfig.query(sqlQuery, function (error, results, fields) {
  if(!error){
       

    let output = results.filter(data=>{
    
        console.log(moment(data[stater.db.field]).format('L') == moment().utc().format("L") && 
        moment().utc().subtract(stater.interval, 'minutes').format('LTS') <= moment(data[stater.db.field]).format('LTS'))
        
        console.log(moment(data[stater.db.field]).format('LTS'))
        console.log(moment(data[stater.db.field]).local().format('LTS'))
        console.log(moment().utc().format('LTS'))
        console.log(moment().utc().subtract(stater.interval, 'minutes').format('LTS'))

        return moment(data[stater.db.field]).format('L') == moment().utc().format("L") && 
  moment().utc().subtract(stater.interval, 'minutes').format('LTS') <= moment(data[stater.db.field]).format('LTS')
  })

//   console.log(output)

  this.data = {
        // fields,
        rows: output.length != 0 ? output : results
        // results
    }        
    cb(this.data)
    } else {
        console.log(error)
    }
  })
}
    start() {
        this.state.job = 'Started'
        return this.state.job;
    }

    status() {

        return this.state.job;
    }

    end() {

        this.state.job = null
        return this.state.job;
    }
}

module.exports = cronJob;