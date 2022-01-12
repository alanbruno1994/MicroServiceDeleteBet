"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("bets", "secured_id", {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("bets", "secured_id");
  },
};
