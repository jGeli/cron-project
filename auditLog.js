require('dotenv').config();
const mysqlConfig = require('./database/mysqldb')
const fs = require('fs');
const moment = require('moment');
const { exit } = require('process');

var cron = require('node-cron');
var dump = require('./auditDump');






class auditLog {
    constructor(props) {
        this.state = { 
          database: process.env.AL_DB_SOURCE || 'test',
          table: process.env.AL_DB_SOURCE_TABLE || 'users',
         field: process.env.AL_DB_FIELD || 'created_at',
         interval: process.env.AL_INTERVAL || '5',
         fileDir: process.env.AL_OUTPUT_DIR || 'audit_logs',
         format: process.env.AL_FORMAT || 'LLL'
        };
    }
    
   
  async auditManager(cb) {  
        const { field, database, table, interval, format  } = this.state;

        let sqlQuery = `SELECT *,
        Date_Format(${field},'%m/%d/%Y') As L,
        Date_Format(${field},'%M %d %Y') As LL,
        Date_Format(${field},'%M %d %Y %l:%i %p') As LLL,
        Date_Format(${field},'%W, %M %d %Y %l:%i %p') As LLLL,
        Date_Format(${field},'%l:%i %p') As LT,
        Date_Format(${field},'%l:%i:%s %p') As LTS
        FROM ${database}.${table};`
  
 mysqlConfig.query(sqlQuery, function (error, results, fields) {
    if (error) throw error;
    let fltrdOutput = results.filter(data=>{
        return (moment().format(`${format}`) >= moment(data[field]).format(`${format}`) && moment().subtract(interval, 'minutes').format(`${format}`) <= moment(data[field]).format(`${format}`)) 
        || (moment().format('LLL') >= moment(data[field]).format('LLL') && moment().subtract(interval, 'minutes').format('LLL') <= moment(data[field]).format('LLL')) 
  });

    let output = fltrdOutput.map(item => {
            let obj = {};
                Object.keys(fields).forEach(key => {
                        if(fields[key].name && fields[key].orgName) {
                            obj[fields[key].name] = item[fields[key].name];
                        }
                })
                return obj
    })
      cb && cb(output)     
  })

}   


    //Function to call to write in the file system the output json file result;
    writeOutput(cb){
        let fileDir = this.state.fileDir;
        let now = new Date();

        let fileName = `${now.getFullYear()}${this.dtf(now.getMonth() + 1)}${this.dtf(now.getDate())}-${this.dtf(now.getHours())}${this.dtf(now.getMinutes())}.json`;
        
        //Create Directory if not exist.
        if (!fs.existsSync(fileDir)){
            fs.mkdirSync(fileDir);
        }

        this.auditManager(result => {
           
            let data = JSON.stringify(result ? result : []);
            
            fs.writeFile(`${fileDir}/${fileName}`, data, (err) => {
                if (err) throw err;
                console.log('Data written to file');
                 console.log(result)
                cb && cb(result)
                // exit()
            }); 
        })
        return this
    }

    dtf = (val) => {
        return val <= 9 ? `0${val}` : val;
    }

    getPullFile = (result) => {



    }

        start = () => {





            const { interval } = this.state;
        cron.schedule(`*/${interval} * * * *`, () => {
            new auditLog().writeOutput();

            })
        }

}

// new auditLog().start();