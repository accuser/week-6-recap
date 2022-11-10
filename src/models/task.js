const { DataTypes, Model } = require("sequelize");
const sequelize = require("../db/sequelize");

class Task extends Model {}

Task.init(
  {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Task",
  }
);

module.exports = Task;
