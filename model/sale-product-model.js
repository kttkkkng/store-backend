import { DataTypes } from 'sequelize';

/** @param {import('sequelize').Sequelize} database_connection */
export function SaleProductModel (database_connection) {
  const model_name = /** @type {const} */ ("sale_product")
  const model = database_connection.define(model_name, {
    sale_uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_img: DataTypes.STRING,
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  })
  /** @param {Record<string, import('sequelize').ModelCtor<any>>} models */
  const SetupRelation = function (models) {
    model.hasOne(models.sale, {
      foreignKey: 'sale_uuid',
      as: 'sale',
    })

    model.hasOne(models.product, {
      foreignKey: 'product_id',
      as: 'product',
    })
  }

  return { model_name, model, SetupRelation }
}