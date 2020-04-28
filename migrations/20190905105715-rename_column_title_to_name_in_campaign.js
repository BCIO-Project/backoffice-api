'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'Campaigns',
      'title',
      'name'
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'Campaigns',
      'name',
      'title'
    );
  }
};
