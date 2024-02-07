import { Sequelize } from "sequelize";
import { config } from "dotenv";
import { CompanyModel } from "#model/company-model.js";
import { StoreModel } from "#model/store-model.js";
import { ProductModel } from "#model/product-model.js";
import { CategoryModel } from "#model/category-model.js";
import { ProductCategoryModel } from "#model/product-category-model.js";
import { SaleModel } from "#model/sale-model.js";
import { SaleProductModel } from "#model/sale-product-model.js";
import { StoreProductModel } from "#model/store-product-model.js";
import { UserModel } from "#model/user-model.js";
import { UserPermissionCompanyModel } from "#model/user-permission-company-model.js";
import { PageModel } from "#model/page-model.js";
import { PageProductModel } from "#model/page-product-model.js";

config()

export const database_connection = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASS,
  {
    dialect: 'postgres',
    port: Number(process.env.DATABASE_PORT),
    logging: false,
    define: {
      freezeTableName: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
      timestamps: true,
    },
  }
)

const model_list = [
  CategoryModel,
  CompanyModel,
  ProductCategoryModel,
  ProductModel,
  SaleModel,
  SaleProductModel,
  StoreModel,
  StoreProductModel,
  UserModel,
  UserPermissionCompanyModel,
  PageModel,
  PageProductModel,
]

/**
 * @typedef ModelName
 * @type {ReturnType<typeof model_list[number]>['model_name']}
 */

/** @type {Partial<Record<ModelName, import('sequelize').ModelCtor<any>>>} */
export const models = {}

const relation = []

for (let index = 0; index < model_list.length; index++) {
  const model = model_list[index](database_connection);
  models[model.model_name] = model.model
  relation.push(model.SetupRelation)
}

for (let index = 0; index < relation.length; index++) {
  relation[index](models)
}

export async function SetupDatabase () {
  await database_connection.authenticate()
  if (String(process.env.DATABASE_SYNC).toLocaleLowerCase() == 'true') await database_connection.sync()
  console.log('successfully setup database connection')
}