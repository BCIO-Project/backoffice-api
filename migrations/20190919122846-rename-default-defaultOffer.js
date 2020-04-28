'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn(
            'Offers',
            'default',
            'defaultOffer'
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn(
            'Offers',
            'defaultOffer',
            'default'
        );
    }
};
