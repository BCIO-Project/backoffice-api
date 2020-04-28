'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        // logic for transforming into the new state

        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.changeColumn(
                    'Offers',
                    'uuid',
                    {
                        type: Sequelize.STRING,
                        unique: false
                    }
                , { transaction: t }),
                queryInterface.removeConstraint('Offers', 'Offers_uuid_key', { transaction: t }),
                queryInterface.removeIndex('Offers', 'Offers_uuid_key', { transaction: t })
            ])
        })
  
    },

    down: function (queryInterface, Sequelize) {

        return queryInterface.changeColumn(
            'Offers',
            'uuid',
            {
                type: Sequelize.STRING,
                unique: true
            }
        );
    }
}