'use strict';
module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define('Offer', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    brandName:  DataTypes.STRING,
    image: DataTypes.STRING,
    headline: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    offerUrl: DataTypes.STRING,
    kickerUrl: DataTypes.STRING,
    kickerText: DataTypes.STRING,
    kickerClass: DataTypes.STRING,
    goal: DataTypes.INTEGER,
    status: DataTypes.STRING,
    defaultOffer: DataTypes.BOOLEAN,
    clicks: DataTypes.INTEGER,
    impressions: DataTypes.INTEGER,
    author: DataTypes.STRING,
    authorLink: DataTypes.STRING,
    footerUrl: DataTypes.STRING,
    photoAuthor: DataTypes.STRING,
    copyright: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE,
    uuid: DataTypes.STRING

  }, {
    paranoid: true
  });
  Offer.associate = function(models) {
    // associations can be defined here
    Offer.belongsToMany(models.Tag, {through: 'OfferTags', foreignKey: 'offerId', as: 'tags'})
    Offer.belongsToMany(models.Campaign, {through: 'CampaignOffers', foreignKey: 'offerId', as: 'campaigns'})
  };
  return Offer;
};