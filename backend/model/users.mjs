import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../config/sequelize.mjs"; 

const user = sequelize.define("user", {
  user_id: {  // Use `user_id` instead of `id`
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {  // Use `username` instead of `name`
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: "users",  // Explicitly set table name
  timestamps: false,   // Disable `createdAt` and `updatedAt` since your table doesn’t have them
});
export default user;
