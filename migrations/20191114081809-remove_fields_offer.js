'use strict';




module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('Offers', 'kickerName', { transaction: t }),
                queryInterface.removeColumn('Offers', 'textColor', { transaction: t }),
                queryInterface.removeColumn('Offers', 'backgroundColor', { transaction: t }),
                queryInterface.removeColumn('Pages', 'textColors', { transaction: t }),
                queryInterface.removeColumn('Pages', 'bgColors', { transaction: t }),
            ])
        })
    },

    


    down: function (queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('Offers', 'kickerName', {
                    type: Sequelize.STRING, allowNull: true,
                }, { transaction: t }),
                queryInterface.addColumn('Offers', 'textColor', {
                    type: Sequelize.STRING, allowNull: true,
                }, { transaction: t }),
                queryInterface.addColumn('Offers', 'backgroundColor', {
                    type: Sequelize.STRING, allowNull: true,
                }, { transaction: t }),
                queryInterface.addColumn('Pages', 'textColors', {
                    type: Sequelize.STRING, allowNull: true,
                }, { transaction: t }),
                queryInterface.addColumn('Pages', 'bgColors', {
                    type: Sequelize.STRING, allowNull: true,
                }, { transaction: t }),
            ])
        })
    }
};