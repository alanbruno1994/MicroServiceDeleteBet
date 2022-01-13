"use strict";
import { DataTypes } from "sequelize";
import { sequelize } from "../../config/conexionDataBase";
const { Model } = require("sequelize");

export class Bets extends Model {}
Bets.init(
  {
    user_id: DataTypes.INTEGER,
    game_id: DataTypes.INTEGER,
    number_choose: DataTypes.STRING,
    price_game: DataTypes.FLOAT,
    secured_id: {
      type: DataTypes.UUIDV4,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Bets",
    tableName: "bets",
  }
);
