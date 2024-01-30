import { DataTypes } from 'sequelize';

/** @param {import('sequelize').Sequelize} database_connection */
export function UserPermissionCompanyModel (database_connection) {
  const model_name = /** @type {const} */ ("user_permission_company")
  const model = database_connection.define(model_name, {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    permission_id: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      primaryKey: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    timestamps: false,
    paranoid: false,
  })
  /** @param {Record<string, import('sequelize').ModelCtor<any>>} models */
  const SetupRelation = function (models) {
    model.hasOne(models.user, {
      foreignKey: 'user_id',
      as: 'user',
    })

    // model.hasOne(models.permission, {
    //   foreignKey: 'permission_id',
    //   as: 'permission',
    // })

    model.hasOne(models.company, {
      foreignKey: 'company_id',
      as: 'company',
    })
  }

  return { model_name, model, SetupRelation }
}