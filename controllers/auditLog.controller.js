require('dotenv').config();
const AuditLog = require('../auditLog');


exports.getAuditManager = async (req, res) => {
  //Audit Logs Parameters || audit logs Options;
  const auditlog = new AuditLog({
    database: process.env.AL_DB, //Target Database Name
    table: process.env.AL_DB_TABLE, // Target Table Name
    field: process.env.AL_DB_FIELD, // Target Table Field for datetime filtering
    interval: process.env.AL_INTERVAL // Audit Logs Execution Interval
  })
  
  await auditlog.auditManager(result => {

    //Write output json file.
    auditlog.writeOutput();

    // Response result
    return res.send(result)
  })
};
