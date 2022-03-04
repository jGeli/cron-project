module.exports = (sequelize, Sequelize) => {
    const Test = sequelize.define("test", {
      title: {
        type: Sequelize.STRING
      },
      timestamp: {
        type: Sequelize.STRING,
        defaultValue: new Date()
      },
      unixTime: {
        type: Sequelize.STRING,
        defaultValue: Date.now()
      },
    },{
        timestamps: true
    });
  
    return Test;
  };