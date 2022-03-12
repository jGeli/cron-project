const mysqlConfig = require('./database/mysqldb')
const fs = require('fs');
const moment = require('moment');
const { exit } = require('process');
const { doesNotMatch } = require('assert');
const targetDB = process.env.AL_DB_TARGET || 'auditlogs'
const fileDir = process.env.AL_OUTPUT_DIR || 'audit_logs'



const removeFile = (file) => {
    if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    return true;
        } else {
    return false;
    }   
}




class auditDump {
    constructor(props) {
        this.state = { 
            database: process.env.AL_DB_TARGET || 'auditlogs',
            table: process.env.AL_DB_TARGET_TABLE || 'event_history',
            fileDir: process.env.AL_OUTPUT_DIR || 'audit_logs'
        };
    }

    duplicateManager () {
        const {database, table, fileDir  } = this.state;
        





    }


    pullFile() {  
            const {database, table, fileDir  } = this.state;
            let x = 0

            const files = fs.readdirSync(fileDir);
            if(files.length === 0) {
            //    return exit(); 
            return;
            }

            let loopArray = function(arr) {
                    let selectQuery = `SELECT id FROM ${database}.${table} WHERE id in `
                    let idArr = [];

                let filePath = `${fileDir}/${arr[x]}`;
                if (!fs.existsSync(filePath)) {
                    // return exit()
                    return;
                }


                let fsData = fs.readFileSync(filePath, 'utf8');
                let data = JSON.parse(fsData);
                if(data.length === 0) {
                    removeFile(filePath)
                    x++
                    if(x < arr.length || x != arr.length){
                        return loopArray(arr)
                    } else {
                        // return exit()
                    }
                    
                }

                   data.forEach((doc) => {
                           idArr.push(JSON.stringify(doc.id))
                   })


                    let sqlSelectQuery = selectQuery + `(${idArr.join(',')});`
                    mysqlConfig.query(sqlSelectQuery, function (error, results, fields) {
                        if (error) {
                        //    return exit(); 
                        }
                        let insertQuery = `INSERT INTO ${database}.${table} VALUES`
                        let vals = '';
                        let arrIds = [];
                       let resData = results.map(a => {return a.id});
                            
                        data.forEach((doc, index) => {
                            let objArr = [];
                             let ind = resData.indexOf(doc.id)
                                ind === -1 && arrIds.push(index);
                                    Object.entries(doc).forEach(([key, value]) => {
                                        objArr.push(`${JSON.stringify(String(value).replace(/\\/g, "")
                                        .replace(/\$/g, ""))}`);
                                    });

                                    if(arrIds.length !== 0) {
                                             vals = ind !== -1 ? vals : vals + (index === arrIds[0] ? `(${objArr.join(',')})` : `,(${objArr.join(',')})`);
                                    } else {
                                        vals = vals;
                                    }
                        })
        
                                
                    let sqlQuery = insertQuery + vals + ";";
                    if(arrIds.length === 0){
                        removeFile(filePath)
                        x++
                        if(x < arr.length || x != arr.length){
                            return loopArray(arr)
                        } else {
                            // return exit()
                        }
                        
                    } else {
                     return mysqlConfig.query(sqlQuery, function (error, result, fields) {
                            if (error) {
                               return; 
                            }
                            removeFile(filePath)
                            x++
                            if(x < arr.length || x != arr.length){
                                return loopArray(arr)
                            } else {
                                // return exit()
                            }
                        })
                    } 
                })
            }
            loopArray(files);
     }   
}


// new auditDump().pullFile()
module.exports = auditDump;











