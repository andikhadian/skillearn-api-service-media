"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class media extends Model {}
  media.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: true,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
      sequelize,
      modelName: "media",
    }
  );
  return media;
};