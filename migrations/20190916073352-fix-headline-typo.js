'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn(
            'Offers',
            'headLine',
            'headline'
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.renameColumn(
            'Offers',
            'headline',
            'headLine'
        );
    }
};
