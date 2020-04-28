'use strict';
module.exports = (sequelize, DataTypes) => {
  const Page = sequelize.define('Page', {
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
    paranoid: true
  });
  Page.associate = function(models) {
    // associations can be defined here
    Page.belongsToMany(models.Position, {through: 'PagePositions', foreignKey: 'pageId', as: 'positions'})
    Page.hasMany(models.Size, { foreignKey: 'pageId', as: 'sizes' })
      
  };
  return Page;
};