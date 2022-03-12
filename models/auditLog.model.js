module.exports = (sequelize, Sequelize) => {
    const Test = sequelize.define("test", {
      user_id: {
        type: Sequelize.STRING
      },
      date_time: {
        type: Sequelize.STRING,
        defaultValue: Date.now()
      },
    },{
        timestamps: true
    });
  
    return Test;
  };