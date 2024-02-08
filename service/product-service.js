import { models } from "#config/database.js";
import { literal } from "sequelize";

const { product, product_category } = models

export function ProductListService (company_id) {
  return product.findAll({
    attributes: [
      'product_id',
      'product_img',
      'product_index',
      'product_name',
      'product_price',
      'shape',
      'color',
      [literal('ARRAY_REMOVE(ARRAY_AGG(product_category.category_id), NULL)'), 'category'],
    ],
    include: [
      {
        attributes: [],
        model: product_category,
        as: 'product_category',
        required: false,
      },
    ],
    raw: true,
    where: {
      company_id: company_id,
    },
    group: ['product.product_id'],
    order: ['product_index'],
  })
}

export function ProductInfoService (company_id, product_id) {
  return product.findOne({
    attributes: ['product_id', 'product_img', 'product_name', 'product_price'],
    where: {
      company_id: company_id,
      product_id: product_id,
    },
  })
}

export function CreateProductService (payload, transaction) {
  return product.create(payload, { transaction })
}

export function UpdateProductService (company_id, product_id, payload, transaction) {
  delete payload.product_id
  delete payload.updated_at
  delete payload.deleted_at

  return product.update(payload, {
    where: {
      company_id: company_id,
      product_id: product_id,
    },
    transaction: transaction,
  })
}

export function DeleteProductService (company_id, product_id) {
  return product.destroy({
    where: {
      company_id: company_id,
      product_id: product_id,
    },
  })
}

export function AddProductToCategoryService (category_id_arr, product_id, transaction) {
  return product_category.bulkCreate(category_id_arr.map(each => ({ product_id: product_id, category_id: each })), { transaction })
}

export function RemoveProductFromCategoryService (category_id_arr, product_id, transaction) {
  return product_category.destroy({
    where: {
      category_id: category_id_arr,
      product_id: product_id,
    },
    transaction: transaction,
  })
}