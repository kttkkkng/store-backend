import { DataTypes } from 'sequelize';

/** @param {import('sequelize').Sequelize} database_connection */
export function PageModel (database_connection) {
  const model_name = /** @type {const} */ ("page")
  const model = database_connection.define(model_name, {
    page_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    page_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
  /** @param {Record<string, import('sequelize').ModelCtor<any>>} models */
  const SetupRelation = function (models) {
    model.hasOne(models.company, {
      foreignKey: 'company_id',
      as: 'company',
    })

    model.hasMany(models.page_product, {
      foreignKey: 'page_id',
      as: 'page_product',
    })
  }

  return { model_name, model, SetupRelation }
}