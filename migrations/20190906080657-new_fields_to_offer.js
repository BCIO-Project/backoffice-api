'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.addColumn('Offers', 'image', {
                  type: Sequelize.STRING
              }, { transaction: t }),
              queryInterface.addColumn('Offers', 'brandName', {
                  type: Sequelize.STRING,
              }, { transaction: t }),
              queryInterface.addColumn('Offers', 'published', {
                  type: Sequelize.INTEGER,
              }, { transaction: t })
          ])
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.removeColumn('Offers', 'image', { transaction: t }),
              queryInterface.removeColumn('Offers', 'brandName', { transaction: t }),
              queryInterface.removeColumn('Offers', 'published', { transaction: t })
          ])
      })
  }
};