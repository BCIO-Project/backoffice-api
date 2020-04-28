'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('Campaigns', 'lastNotificationDate', {
                    type: Sequelize.DATE, allowNull: true,
                }, { transaction: t })
            ])
        })
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('Campaigns', 'lastNotificationDate', { transaction: t })
            ])
        })
    }
};