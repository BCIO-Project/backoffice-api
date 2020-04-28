'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('OfferTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      offerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {         
          model: 'Offers',
          key: 'id'
        }
      },
      tagId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {         
          model: 'Tags',
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
    return queryInterface.dropTable('OfferTags');
  }
};