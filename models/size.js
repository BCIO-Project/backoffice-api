'use strict';
module.exports = (sequelize, DataTypes) => {
    const Size = sequelize.define('Size', {
        name: DataTypes.STRING,
        pageId: DataTypes.INTEGER,
        height: DataTypes.INTEGER,
        width: DataTypes.INTEGER,
        class: DataTypes.STRING,
        template: DataTypes.TEXT,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE
    }, {
        paranoid: true
    });
    Size.associate = function(models) {
        // associations can be defined here
        Size.belongsTo(models.Page, { foreignKey: 'pageId', as: 'page' })
        
    };
    return Size;
};