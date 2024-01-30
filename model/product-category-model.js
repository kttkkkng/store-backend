import { DataTypes } from 'sequelize';

/** @param {import('sequelize').Sequelize} database_connection */
export function ProductCategoryModel (database_connection) {
  const model_name = /** @type {const} */ ("product_category")
  const model = database_connection.define(model_name, {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  }, {
    paranoid: false,
    timestamps: false,
  })
  /** @param {Record<string, import('sequelize').ModelCtor<any>>} models */
  const SetupRelation = function (models) {
    model.hasOne(models.product, {
      foreignKey: 'product_id',
      as: 'product',
    })

    model.hasOne(models.category, {
      foreignKey: 'category_id',
      as: 'category',
    })
  }

  return { model_name, model, SetupRelation }
}