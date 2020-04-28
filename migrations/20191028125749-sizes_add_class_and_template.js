'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('Sizes', 'class', {
                    type: Sequelize.STRING
                }, { transaction: t }),
                queryInterface.addColumn('Sizes', 'template', {
                    type: Sequelize.TEXT,
                }, { transaction: t })
            ])
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('Sizes', 'class', { transaction: t }),
                queryInterface.removeColumn('Sizes', 'template', { transaction: t })
            ])
        })
    }
};