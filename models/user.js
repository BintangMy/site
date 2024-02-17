'use strict';
const bcrypt = require('bcryptjs');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(models.Role,{foreignKey:"roleId"})
      User.hasMany(models.Post,{foreignKey:"authorId"})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "username not empty"
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "not empty"
        },
        lengthPassword(value) {
          if (value.length < 5) {
            throw new Error("Length Password Minimum 5")
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:{
        msg:"e-mail already registered"
      },
      validate: {
        notEmpty: {
          msg: "email not empty"
        },
        isEmail: {
          msg: "Format must be e-mail"
        }
      }
    },
    roleId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((data) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(data.password, salt)
    data.password = hash
  })
  return User;
};