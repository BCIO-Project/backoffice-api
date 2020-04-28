'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.changeColumn(
      'Tags',
      'name',
      { 
        type: Sequelize.STRING,
        unique: true
      }
    );
  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.changeColumn(
      'Tags',
      'name',
      { 
        type: Sequelize.STRING,
        unique: false
      }
    );
  }
}