'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PageTemplates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pageId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {         
          model: 'Pages',
          key: 'id'
        }
      },
      templateId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {         
          model: 'Templates',
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
    return queryInterface.dropTable('PageTemplates');
  }
};