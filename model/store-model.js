import { DataTypes } from 'sequelize';

/** @param {import('sequelize').Sequelize} database_connection */
export function StoreModel (database_connection) {
  const model_name = /** @type {const} */ ("store")
  const model = database_connection.define(model_name, {
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    store_img: DataTypes.STRING,
    store_name: {
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

    model.hasMany(models.store_product, {
      foreignKey: 'store_id',
      as: 'store_product',
    })

    model.hasMany(models.sale, {
      foreignKey: 'store_id',
      as: 'sale',
    })
  }

  return { model_name, model, SetupRelation }
}