"use strict";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/conexionDataBase";
export class User extends Model {}
User.init(
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    secured_id: DataTypes.UUID,
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);
