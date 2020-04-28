'use strict';
module.exports = (sequelize, DataTypes) => {
  const Position = sequelize.define('Position', {
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, { 
      paranoid: true
});
  Position.associate = function(models) {
    // associations can be defined here
      Position.belongsToMany(models.Page, { through: 'PagePositions', foreignKey: 'positionId', as: 'pages' })
  };
  return Position;
};