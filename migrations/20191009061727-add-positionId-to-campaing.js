'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        // logic for transforming into the new state

        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('Campaigns', 'positionId', {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'Positions',
                        key: 'id'},
                    transaction: t })
            ])
        })
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('Campaigns', 'positionId', { transaction: t })
            ])
        })
    }
};
