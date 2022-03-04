const dbConfig = require("../config/db.config.js");
// console.log(dbConfig)
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.Port,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  define: {
    timestamps: true
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Barangay Models
db.test = require("./test.model.js")(sequelize, Sequelize);
// db.test1 = require("./test1.model.js")(sequelize, Sequelize);



module.exports = db;