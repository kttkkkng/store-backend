import { DataTypes } from 'sequelize';

/** @param {import('sequelize').Sequelize} database_connection */
export function CompanyModel (database_connection) {
  const model_name = /** @type {const} */ ("company")
  const model = database_connection.define(model_name, {
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    company_img: DataTypes.STRING,
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
  /** @param {Record<string, import('sequelize').ModelCtor<any>>} models */
  const SetupRelation = function (models) {
    model.hasMany(models.store, {
      foreignKey: 'company_id',
      as: 'store',
    })

    model.hasMany(models.product, {
      foreignKey: 'company_id',
      as: 'product',
    })

    model.hasMany(models.category, {
      foreignKey: 'company_id',
      as: 'category',
    })

    model.hasMany(models.user_permission_company, {
      foreignKey: 'company_id',
      as: 'user_permission_company',
    })

    model.hasMany(models.sale, {
      foreignKey: 'company_id',
      as: 'sale',
    })
  }

  return { model_name, model, SetupRelation }
}