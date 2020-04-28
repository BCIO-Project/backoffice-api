'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'Templates',
      'template',
      'path'
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'Templates',
      'path',
      'template'
    );
  }
};
