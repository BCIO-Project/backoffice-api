'use strict';
module.exports = (sequelize, DataTypes) => {
  const OfferTag = sequelize.define('OfferTag', {
    offerId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    paranoid: true
  });
  OfferTag.associate = function(models) {
    // associations can be defined here
    OfferTag.belongsTo(models.Tag, {foreignKey: 'tagId'})
    OfferTag.belongsTo(models.Offer, {foreignKey: 'offerId'})
  };
  return OfferTag;
};