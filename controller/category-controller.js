import { ErrorObject } from "#middleware/error-middleware.js"
import { CreateCategoryService, DeleteCategoryService, CategoryInfoService, CategoryListService, UpdateCategoryService } from "#service/category-service.js"

export async function CategoryList (req, res, next) {
  try {
    const result = await CategoryListService(2)

    res.send(result)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function CategoryInfo (req, res, next) {
  try {
    const category = await CategoryInfoService(2, req.params.category_id)

    if (!category) next(ErrorObject('NOT_FOUND', 'category not found'))

    res.send(category)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function CreateCategory (req, res, next) {
  try {
    req.body.company_id = 2

    const category = await CreateCategoryService(req.body)

    res.send(category)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function UpdateCategory (req, res, next) {
  try {
    await UpdateCategoryService(2, req.params.category_id, req.body)

    res.send({ status: 'success' })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function DeleteCategory (req, res, next) {
  try {
    await DeleteCategoryService(2, req.params.category_id)

    res.send({ status: 'success' })
  } catch (error) {
    console.log(error)
    next(error)
  }
}