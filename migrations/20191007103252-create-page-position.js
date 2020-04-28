'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('PagePositions', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            pageId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Pages',
                    key: 'id'
                }
            },
            positionId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Positions',
                    key: 'id'
                }
            },
            deletedAt: {
                type: Sequelize.DATE
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
        return queryInterface.dropTable('PagePositions');
    }
};