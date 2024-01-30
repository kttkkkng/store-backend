import { DataTypes } from 'sequelize';

/** @param {import('sequelize').Sequelize} database_connection */
export function UserModel (database_connection) {
  const model_name = /** @type {const} */ ("user")
  const model = database_connection.define(model_name, {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    access_token: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_img: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: DataTypes.STRING,
  })
  /** @param {Record<string, import('sequelize').ModelCtor<any>>} models */
  const SetupRelation = function (models) {
    model.hasMany(models.user_permission_company, {
      foreignKey: 'user_id',
      as: 'user_permission_company',
    })
  }

  return { model_name, model, SetupRelation }
}