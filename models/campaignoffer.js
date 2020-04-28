'use strict';
module.exports = (sequelize, DataTypes) => {
  const CampaignOffer = sequelize.define('CampaignOffer', {
    campaignId: DataTypes.INTEGER,
    offerId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    paranoid: true
  });
  CampaignOffer.associate = function(models) {
    // associations can be defined here
    CampaignOffer.belongsTo(models.Campaign, {foreignKey: 'campaignId'})
    CampaignOffer.belongsTo(models.Offer, {foreignKey: 'offerId'})
  };
  return CampaignOffer;
};