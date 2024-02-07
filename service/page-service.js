import { models } from "#config/database.js"
import { literal } from "sequelize"

const { page, page_product } = models

export function PageListService (company_id) {
  return page.findAll({
    attributes: ['page_id', 'page_name', [literal('ARRAY_REMOVE(ARRAY_AGG(page_product.product_id ORDER BY index), NULL)'), 'product']],
    include: [
      {
        attributes: [],
        model: page_product,
        as: 'page_product',
        required: false,
      },
    ],
    raw: true,
    where: {
      company_id: company_id,
    },
    group: ['page.page_id'],
  })
}

export function CreatePageService (payload, transaction) {
  return page.create(payload, { transaction })
}

export function UpdatePageService (company_id, page_id, payload, transaction) {
  delete payload.page_id
  delete payload.updated_at
  delete payload.deleted_at

  return page.update(payload, {
    where: {
      company_id: company_id,
      page_id: page_id,
    },
    transaction: transaction,
  })
}

export function AddProductToPageService (page_id, product_id_arr, transaction) {
  if (product_id_arr.length == 0) return
  return page_product.bulkCreate(product_id_arr.map((each, index) => ({ product_id: each, page_id: page_id, index: index })), { transaction })
}

export function DeleteAllProductInPageService (page_id, transaction) {
  return page_product.destroy({
    where: {
      page_id: page_id,
    },
    transaction: transaction,
  })
}