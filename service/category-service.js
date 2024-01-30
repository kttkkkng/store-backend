import { models } from "#config/database.js";

const { category } = models

export function CategoryListService (company_id) {
  return category.findAll({
    attributes: ['category_id', 'category_img', 'category_name'],
    where: {
      company_id: company_id,
    },
  })
}

export function CategoryInfoService (company_id, category_id) {
  return category.findOne({
    attributes: ['category_id', 'category_img', 'category_name'],
    where: {
      company_id: company_id,
      category_id: category_id,
    },
  })
}

export function CreateCategoryService (payload) {
  return category.create(payload)
}

export function UpdateCategoryService (company_id, category_id, payload) {
  delete payload.category_id
  delete payload.updated_at
  delete payload.deleted_at

  return category.update(payload, {
    where: {
      company_id: company_id,
      category_id: category_id,
    },
  })
}

export function DeleteCategoryService (company_id, category_id) {
  return category.destroy({
    where: {
      company_id: company_id,
      category_id: category_id,
    },
  })
}