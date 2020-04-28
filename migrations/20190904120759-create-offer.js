'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Offers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      headLine: {
        type: Sequelize.STRING
      },
      subtitle: {
        type: Sequelize.STRING
      },
      offerUrl: {
        type: Sequelize.STRING
      },
      kickerUrl: {
        type: Sequelize.STRING
      },
      kickerName: {
        type: Sequelize.STRING
      },
      kickerText: {
        type: Sequelize.STRING
      },
      kickerImg: {
        type: Sequelize.STRING
      },
      textColor: {
        type: Sequelize.STRING
      },
      backgroundColor: {
        type: Sequelize.STRING
      },
      goal: {
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      default: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      clicks: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('Offers');
  }
};