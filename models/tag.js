'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    paranoid: true
  });
  Tag.associate = function(models) {
    // associations can be defined here
    Tag.belongsToMany(models.Offer, {through: 'OfferTags', foreignKey: 'tagId', as: 'offers'})
  };
  return Tag;
};