'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Records',
      'amount',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Records',
      'amount',
      {
        type: Sequelize.STRING,
      }
    )
  }
};
