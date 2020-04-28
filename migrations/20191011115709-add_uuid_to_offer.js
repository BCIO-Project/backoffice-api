'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        // logic for transforming into the new state
        return queryInterface.addColumn(
            'Offers',
            'uuid',
            {
                type: Sequelize.STRING,
                unique: true,
                allowNull: true,
            }
        );
    },

    down: function (queryInterface, Sequelize) {
        // logic for reverting the changes
        return queryInterface.removeColumn(
            'Offers',
            'uuid'
        );
    }
}