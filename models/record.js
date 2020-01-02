'use strict';
module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('Record', {
    name: DataTypes.STRING,
    merchant: DataTypes.STRING,
    category: DataTypes.STRING,
    date: DataTypes.STRING,
    month: DataTypes.STRING,
    amount: DataTypes.STRING
  }, {});
  Record.associate = function (models) {
    // associations can be defined here
    Record.belongsTo(models.User)
  };
  return Record;
};