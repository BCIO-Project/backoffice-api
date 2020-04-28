'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
        return Promise.all([
          queryInterface.addColumn('Templates', 'template', {
            type: Sequelize.STRING
          }, { transaction: t })
        ])
    })
},

down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
        return Promise.all([
            queryInterface.removeColumn('Templates', 'template', { transaction: t })
        ])
    })
}
};
