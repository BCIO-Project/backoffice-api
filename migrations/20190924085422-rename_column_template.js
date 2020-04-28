'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'Templates',
      'weight',
      'width'
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'Templates',
      'width',
      'weight'
    );
  }
};
