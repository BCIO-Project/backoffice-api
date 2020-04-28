'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'Pages',
      'slug',
      { 
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      }
    );
  },

  down: function(queryInterface, Sequelize) {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'Pages',
      'slug'
    );
  }
}