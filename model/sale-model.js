import { DataTypes } from 'sequelize';

/** @param {import('sequelize').Sequelize} database_connection */
export function SaleModel (database_connection) {
  const model_name = /** @type {const} */ ("sale")
  const model = database_connection.define(model_name, {
    sale_uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sale_note: DataTypes.STRING,
    total_price: DataTypes.INTEGER,
  })
  /** @param {Record<string, import('sequelize').ModelCtor<any>>} models */
  const SetupRelation = function (models) {
    model.hasOne(models.company, {
      foreignKey: 'company_id',
      as: 'company',
    })

    model.hasOne(models.store, {
      foreignKey: 'store_id',
      sourceKey: 'store_id',
      as: 'store',
    })

    model.hasMany(models.sale_product, {
      foreignKey: 'sale_uuid',
      as: 'sale_product',
    })
  }

  return { model_name, model, SetupRelation }
}