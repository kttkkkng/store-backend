import { DataTypes } from 'sequelize';

/** @param {import('sequelize').Sequelize} database_connection */
export function ProductModel (database_connection) {
  const model_name = /** @type {const} */ ("product")
  const model = database_connection.define(model_name, {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_index: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_img: DataTypes.STRING,
  })
  /** @param {Record<string, import('sequelize').ModelCtor<any>>} models */
  const SetupRelation = function (models) {
    model.hasOne(models.company, {
      foreignKey: 'company_id',
      as: 'company',
    })

    model.hasMany(models.product_category, {
      foreignKey: 'product_id',
      as: 'product_category',
    })

    model.hasMany(models.store_product, {
      foreignKey: 'product_id',
      as: 'store_product',
    })

    model.hasMany(models.sale_product, {
      foreignKey: 'product_id',
      as: 'sale_product',
    })
  }

  return { model_name, model, SetupRelation }
}