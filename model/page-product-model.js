import { DataTypes } from 'sequelize';

/** @param {import('sequelize').Sequelize} database_connection */
export function PageProductModel (database_connection) {
  const model_name = /** @type {const} */ ("page_product")
  const model = database_connection.define(model_name, {
    page_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    paranoid: false,
    timestamps: false,
  })
  /** @param {Record<string, import('sequelize').ModelCtor<any>>} models */
  const SetupRelation = function (models) {
    model.hasOne(models.page, {
      foreignKey: 'page_id',
      as: 'page',
    })

    model.hasOne(models.product, {
      foreignKey: 'product_id',
      as: 'product',
    })
  }

  return { model_name, model, SetupRelation }
}