'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        // logic for transforming into the new state

        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('Notifications', 'read', {
                    type: Sequelize.BOOLEAN, allowNull: false,
                }, { transaction: t })
            ])
        })
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('Notifications', 'read', { transaction: t })
            ])
        })
    }
};