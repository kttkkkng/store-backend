import { models } from "#config/database.js";
import { Op, literal } from "sequelize";

const { sale, sale_product, store } = models

/**
 * @typedef SaleProduct
 * @property {string} [sale_uuid]
 * @property {number} product_id
 * @property {string} [product_img]
 * @property {string} product_name
 * @property {number} product_price
 * 
 * @typedef Sale
 * @property {string} sale_uuid
 * @property {number} company_id
 * @property {number} store_id
 * @property {string} [sale_note]
 * @property {SaleProduct[]} sale_product
 * 
 * @param {Sale} sales 
 */
export function CheckoutService (sales) {
  return sale.create(sales, {
    include: [
      {
        model: sale_product,
        as: 'sale_product',
      },
    ],
  })
}

/**
 * @param {number} company_id
 * @param {number | string} store_id
 * @param {string} [search] 
 */
export function SaleHistoryService (company_id, store_id, search) {
  /** @type {import("sequelize").WhereOptions} */
  const where = {
    company_id: company_id,
  }
  if (typeof store_id == 'number') {
    where.store_id = store_id
  }
  if (search) {
    where.sale_uuid = {
      [Op.iLike]: `%${search}%`
    }
  }
  return sale.findAll({
    attributes: [
      'total_price',
      'created_at',
      'sale_note',
    ],
    include: [
      {
        attributes: [
          'product_img',
          'product_name',
          'product_price',
          'amount',
        ],
        model: sale_product,
        as: 'sale_product',
      },
      {
        attributes: [
          'store_name',
        ],
        model: store,
        as: 'store',
      },
    ],
    where: where,
    limit: 300,
    order: [['created_at', 'DESC']],
  })
}