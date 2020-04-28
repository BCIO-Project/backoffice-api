'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    // logic for transforming into the new state

    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('Templates', 'textColors', { type: Sequelize.STRING, allowNull: true,
        }, { transaction: t }),
        queryInterface.addColumn('Templates', 'bgColors', { type: Sequelize.STRING, allowNull: true,
        }, { transaction: t })
      ])
    })
  },

  down: function(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
          queryInterface.removeColumn('Templates', 'textColors', { transaction: t }),
          queryInterface.removeColumn('Templates', 'bgColors', { transaction: t })
      ])
  })
  }
};
