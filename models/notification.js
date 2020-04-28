'use strict';
module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
        type: DataTypes.STRING,
        userId: DataTypes.INTEGER,
        campaignId: DataTypes.INTEGER,
        text: DataTypes.STRING,
        read: DataTypes.BOOLEAN,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
        deletedAt: DataTypes.DATE
    }, {
        paranoid: false
    });
    Notification.associate = function(models) {
        // associations can be defined here
        Notification.belongsTo(models.Campaign, { foreignKey: 'campaignId' })
        Notification.belongsTo(models.User, { foreignKey: 'userId' })
    };
    return Notification;
};