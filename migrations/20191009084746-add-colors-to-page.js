'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        // logic for transforming into the new state

        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('Pages', 'textColors', {
                    type: Sequelize.STRING, allowNull: true,
                }, { transaction: t }),
                queryInterface.addColumn('Pages', 'bgColors', {
                    type: Sequelize.STRING, allowNull: true,
                }, { transaction: t })
            ])
        })
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('Pages', 'textColors', { transaction: t }),
                queryInterface.removeColumn('Pages', 'bgColors', { transaction: t })
            ])
        })
    }
};