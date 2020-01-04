'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Records',
      'date',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    )
  },



  down: (queryInterface, Sequelize) => {

    queryInterface.changeColumn(
      'Records',
      'date',
      {
        type: Sequelize.STRING,
      }
    )


  }
};
