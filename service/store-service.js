import { models } from "#config/database.js";
import { literal } from "sequelize";

const { store, store_product, product, product_category, page_product } = models

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

export function CreateStoreService (payload, transaction) {
  return store.create(payload, { transaction })
}

export function UpdateStoreService (company_id, store_id, payload, transaction) {
  delete payload.store_id
  delete payload.updated_at
  delete payload.deleted_at

  return store.update(payload, {
    where: {
      company_id: company_id,
      store_id: store_id,
    },
    transaction: transaction,
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
      [literal('jsonb_object_agg(COALESCE(page_product.page_id, 0), page_product.index)'), 'page'],
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
        model: page_product,
        as: 'page_product',
        required: false,
      },
    ],
    where: {
      company_id: company_id,
    },
    group: ['product.product_id'],
  })
}

/**
 * @param {*} store_id 
 * @param {{ product_id: number, amount: number, store_id?: number }[]} product_arr 
 */
export function AddProductToStoreService (store_id, product_arr, transaction) {
  for (let index = 0; index < product_arr.length; index++) {
    product_arr[index].store_id = store_id;
  }
  return store_product.bulkCreate(product_arr, { transaction })
}

export function RemoveProductFromStoreService (store_id, product_id_arr, transaction) {
  return store_product.destroy({
    where: {
      store_id: store_id,
      product_id: product_id_arr,
    },
    transaction: transaction,
  })
}