import { DataTypes } from 'sequelize';

/** @param {import('sequelize').Sequelize} database_connection */
export function StoreProductModel (database_connection) {
  const model_name = /** @type {const} */ ("store_product")
  const model = database_connection.define(model_name, {
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    paranoid: false,
    timestamps: false,
  })
  /** @param {Record<string, import('sequelize').ModelCtor<any>>} models */
  const SetupRelation = function (models) {
    model.hasOne(models.store, {
      foreignKey: 'store_id',
      as: 'store',
    })

    model.hasOne(models.product, {
      foreignKey: 'product_id',
      as: 'product',
    })
  }

  return { model_name, model, SetupRelation }
}