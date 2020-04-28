'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CampaignOffers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      campaignId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {         
          model: 'Campaigns',
          key: 'id'
        }
      },
      offerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {         
          model: 'Offers',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CampaignOffers');
  }
};