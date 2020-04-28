//delete-template
'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn('Campaigns', 'templateId', { transaction: t }),
                queryInterface.sequelize.query(`DROP TABLE "PageTemplates" CASCADE;`, { transaction: t }),
                queryInterface.sequelize.query(`DROP TABLE "Templates" CASCADE;`, { transaction: t }),
                queryInterface.dropTable('PageTemplates', { transaction: t }),
                queryInterface.dropTable('Templates', { transaction: t })
            ])
        })

    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.createTable('Templates', {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER
                    },
                    name: {
                        allowNull: false,
                        type: Sequelize.STRING
                    },
                    height: {
                        type: Sequelize.INTEGER
                    },
                    weight: {
                        type: Sequelize.INTEGER
                    },
                    createdAt: {
                        allowNull: false,
                        type: Sequelize.DATE
                    },
                    updatedAt: {
                        allowNull: false,
                        type: Sequelize.DATE
                    },
                    deletedAt: {
                        type: Sequelize.DATE
                    }

                }, { transaction: t }),
                queryInterface.addColumn('Campaigns', 'templateId', {
                    type: Sequelize.INTEGER
                }, { transaction: t }),
                queryInterface.createTable('PageTemplates', {
                    id: {
                        allowNull: false,
                        autoIncrement: true,
                        primaryKey: true,
                        type: Sequelize.INTEGER
                    },
                    pageId: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'Pages',
                            key: 'id'
                        }
                    },
                    templateId: {
                        allowNull: false,
                        type: Sequelize.INTEGER,
                        references: {
                            model: 'Templates',
                            key: 'id'
                        }
                    },
                    createdAt: {
                        allowNull: false,
                        type: Sequelize.DATE
                    },
                    updatedAt: {
                        allowNull: false,
                        type: Sequelize.DATE
                    },
                    deletedAt: {
                        type: Sequelize.DATE
                    }

                }, { transaction: t })

            ])
        })
    }
};