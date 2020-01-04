'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Records',
      'month',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Records',
      'month',
      {
        type: Sequelize.STRING,
      }
    )
  }
};
