'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'Offers',
      'published',
      'impressions'
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'Offers',
      'impressions',
      'published'
    );
  }
};
