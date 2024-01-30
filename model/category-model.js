import { DataTypes } from 'sequelize';

/** @param {import('sequelize').Sequelize} database_connection */
export function CategoryModel (database_connection) {
  const model_name = /** @type {const} */ ("category")
  const model = database_connection.define(model_name, {
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_img: DataTypes.STRING,
    category_name: {
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

    model.hasMany(models.product_category, {
      foreignKey: 'category_id',
      as: 'product_category',
    })
  }

  return { model_name, model, SetupRelation }
}