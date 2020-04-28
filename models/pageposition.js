'use strict';
module.exports = (sequelize, DataTypes) => {
  const PagePosition = sequelize.define('PagePosition', {
    pageId: DataTypes.INTEGER,
    positionId: DataTypes.INTEGER,
    deletedAt: DataTypes.DATE
  }, { paranoid: true});
  PagePosition.associate = function(models) {
    // associations can be defined here
    PagePosition.belongsTo(models.Position, { foreignKey: 'positionId' })
    PagePosition.belongsTo(models.Page, { foreignKey: 'pageId' })
  };
  return PagePosition;
};