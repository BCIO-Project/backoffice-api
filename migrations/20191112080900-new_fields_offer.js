'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('Offers', 'kickerImg', { transaction: t }),
                queryInterface.addColumn('Offers', 'kickerClass', {
                    type: Sequelize.STRING, allowNull: true,
                }, { transaction: t }),
                queryInterface.addColumn('Offers', 'author', {
                    type: Sequelize.STRING, allowNull: true,
                }, { transaction: t }),
                queryInterface.addColumn('Offers', 'authorLink', {
                    type: Sequelize.STRING, allowNull: true,
                }, { transaction: t }),
                queryInterface.addColumn('Offers', 'footerUrl', {
                    type: Sequelize.STRING, allowNull: true,
                }, { transaction: t }),
                queryInterface.addColumn('Offers', 'photoAuthor', {
                    type: Sequelize.STRING, allowNull: true,
                }, { transaction: t }),
                queryInterface.addColumn('Offers', 'copyright', {
                    type: Sequelize.STRING, allowNull: true,
                }, { transaction: t }),
            ])
        })
    },

    down: function (queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn('Offers', 'kickerImg', {
                    type: Sequelize.STRING, allowNull: true,
                }, { transaction: t }),
                queryInterface.removeColumn('Offers', 'kickerClass', { transaction: t }),
                queryInterface.removeColumn('Offers', 'author', { transaction: t }),
                queryInterface.removeColumn('Offers', 'authorLink', { transaction: t }),
                queryInterface.removeColumn('Offers', 'footerUrl', { transaction: t }),
                queryInterface.removeColumn('Offers', 'photoAuthor', { transaction: t }),
                queryInterface.removeColumn('Offers', 'copyright', { transaction: t })
            ])
        })
    }
};