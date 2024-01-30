import { database_connection } from "#config/database.js"
import { ErrorObject } from "#middleware/error-middleware.js"
import { AddProductToCategoryService, CreateProductService, DeleteProductService, ProductInfoService, ProductListService, RemoveProductFromCategoryService, UpdateProductService } from "#service/product-service.js"

export async function ProductList (req, res, next) {
  try {
    const result = await ProductListService(2)

    res.send(result)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function ProductInfo (req, res, next) {
  try {
    const product = await ProductInfoService(2, req.params.product_id)

    if (!product) next(ErrorObject('NOT_FOUND', 'product not found'))

    res.send(product)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function CreateProduct (req, res, next) {
  try {
    req.body.company_id = 2

    const product = await database_connection.transaction(async t => {
      const product = await CreateProductService(req.body)
      if (req.body.category && req.body.category.length > 0) await AddProductToCategoryService(req.body.category, product.product_id)
      return product
    })

    res.send(product)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function UpdateProduct (req, res, next) {
  try {
    await database_connection.transaction(async t => {
      if (req.body.remove_category) await RemoveProductFromCategoryService(req.body.remove_category, req.params.product_id)
      if (req.body.add_category) await AddProductToCategoryService(req.body.add_category, req.params.product_id)
      await UpdateProductService(2, req.params.product_id, req.body.product)
    })

    res.send({ status: 'success' })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function DeleteProduct (req, res, next) {
  try {
    await DeleteProductService(2, req.params.product_id)

    res.send({ status: 'success' })
  } catch (error) {
    console.log(error)
    next(error)
  }
}