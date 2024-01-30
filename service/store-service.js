import { models } from "#config/database.js";
import { literal } from "sequelize";

const { store, store_product, product, product_category } = models

export function StoreListService (company_id) {
  return store.findAll({
    attributes: ['store_id', 'store_img', 'store_name', [literal('ARRAY_REMOVE(ARRAY_AGG(store_product.product_id), NULL)'), 'product']],
    include: [
      {
        attributes: [],
        model: store_product,
        as: 'store_product',
        required: false,
      }
    ],
    raw: true,
    where: {
      company_id: company_id,
    },
    group: ['store.store_id'],
  })
}

export function StoreInfoService (company_id, store_id) {
  return store.findOne({
    attributes: ['store_id', 'store_img', 'store_name'],
    where: {
      company_id: company_id,
      store_id: store_id,
    },
  })
}

export function CreateStoreService (payload) {
  return store.create(payload)
}

export function UpdateStoreService (company_id, store_id, payload) {
  delete payload.store_id
  delete payload.updated_at
  delete payload.deleted_at

  return store.update(payload, {
    where: {
      company_id: company_id,
      store_id: store_id,
    },
  })
}

export function DeleteStoreService (company_id, store_id) {
  return store.destroy({
    where: {
      company_id: company_id,
      store_id: store_id,
    },
  })
}

export function SaleListService (company_id) {
  return product.findAll({
    attributes: [
      'product_id',
      'product_img',
      'product_index',
      'product_name',
      'product_price',
      [literal('ARRAY_REMOVE(ARRAY_AGG(DISTINCT product_category.category_id), NULL)'), 'category'],
      [literal("jsonb_object_agg(store_product.store_id, store_product.amount)"), 'store'],
    ],
    raw: true,
    include: [
      {
        attributes: [],
        model: store_product,
        as: 'store_product',
        required: true,
      },
      {
        attributes: [],
        model: product_category,
        as: 'product_category',
        required: false,
      },
    ],
    where: {
      company_id: company_id,
    },
    group: ['product.product_id'],
    order: ['product_index'],
  })
}

/**
 * @param {*} store_id 
 * @param {{ product_id: number, amount: number, store_id?: number }[]} product_arr 
 */
export function AddProductToStoreService (store_id, product_arr) {
  for (let index = 0; index < product_arr.length; index++) {
    product_arr[index].store_id = store_id;
  }
  return store_product.bulkCreate(product_arr)
}

export function RemoveProductFromStoreService (store_id, product_id_arr) {
  return store_product.destroy({
    where: {
      store_id: store_id,
      product_id: product_id_arr,
    },
  })
}