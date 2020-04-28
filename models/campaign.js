'use strict';
module.exports = (sequelize, DataTypes) => {
  const Campaign = sequelize.define('Campaign', {
    name: DataTypes.STRING,
    pageId: DataTypes.INTEGER,
    positionId: DataTypes.INTEGER,
    from: DataTypes.DATE,
    to: DataTypes.DATE,
    status: DataTypes.STRING,
    lastNotificationDate: DataTypes.DATE,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    paranoid: true
  });


  Campaign.associate = function(models) {
    // associations can be defined here
    Campaign.belongsTo(models.Page, {foreignKey: 'pageId', as: 'page'})
      Campaign.belongsTo(models.Position, { foreignKey: 'positionId', as: 'position' })
    Campaign.belongsToMany(models.Offer, {through: 'CampaignOffers', foreignKey: 'campaignId', as: 'offers'})

  };
  return Campaign;
  
};