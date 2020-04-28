'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
            queryInterface.addColumn('Offers', 'deletedAt', {
              type: Sequelize.DATE
            }, { transaction: t }),
            queryInterface.addColumn('Campaigns', 'deletedAt', {
              type: Sequelize.DATE,
            }, { transaction: t }),
            queryInterface.addColumn('Pages', 'deletedAt', {
              type: Sequelize.DATE,
            }, { transaction: t }),
            queryInterface.addColumn('Tags', 'deletedAt', {
              type: Sequelize.DATE
            }, { transaction: t }),
            queryInterface.addColumn('Templates', 'deletedAt', {
              type: Sequelize.DATE,
            }, { transaction: t }),
            queryInterface.addColumn('CampaignOffers', 'deletedAt', {
              type: Sequelize.DATE,
            }, { transaction: t }),
            queryInterface.addColumn('OfferTags', 'deletedAt', {
              type: Sequelize.DATE
            }, { transaction: t }),
            queryInterface.addColumn('PageTemplates', 'deletedAt', {
              type: Sequelize.DATE,
            }, { transaction: t })
            ])
      })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.sequelize.transaction((t) => {
          return Promise.all([
              queryInterface.removeColumn('Offers', 'deletedAt', { transaction: t }),
              queryInterface.removeColumn('Campaigns', 'deletedAt', { transaction: t }),
              queryInterface.removeColumn('Pages', 'deletedAt', { transaction: t }),
              queryInterface.removeColumn('Tags', 'deletedAt', { transaction: t }),
              queryInterface.removeColumn('Templates', 'deletedAt', { transaction: t }),
              queryInterface.removeColumn('CampaignOffers', 'deletedAt', { transaction: t }),
              queryInterface.removeColumn('OfferTags', 'deletedAt', { transaction: t }),
              queryInterface.removeColumn('PageTemplates', 'deletedAt', { transaction: t })
          ])
      })
  }
};