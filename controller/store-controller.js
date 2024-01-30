import { database_connection } from "#config/database.js"
import { ErrorObject } from "#middleware/error-middleware.js"
import { AddProductToStoreService, CreateStoreService, DeleteStoreService, SaleListService, RemoveProductFromStoreService, StoreInfoService, StoreListService, UpdateStoreService } from "#service/store-service.js"

export async function StoreList (req, res, next) {
  try {
    const result = await StoreListService(2)

    res.send(result)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function StoreInfo (req, res, next) {
  try {
    const store = await StoreInfoService(2, req.params.store_id)

    if (!store) next(ErrorObject('NOT_FOUND', 'store not found'))

    res.send(store)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function CreateStore (req, res, next) {
  try {
    req.body.company_id = 2

    const store = await database_connection.transaction(async t => {
      const store = await CreateStoreService(req.body)
      if (req.body.product && req.body.product.length > 0) await AddProductToStoreService(store.store_id, req.body.product)
      return store
    })

    res.send(store)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function UpdateStore (req, res, next) {
  try {
    await database_connection.transaction(async t => {
      if (req.body.remove_product) await RemoveProductFromStoreService(req.params.store_id, req.body.remove_product)
      if (req.body.add_product) await AddProductToStoreService(req.params.store_id, req.body.add_product.map(each => ({ product_id: each })))
      await UpdateStoreService(2, req.params.store_id, req.body.store)
    })

    res.send({ status: 'success' })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function DeleteStore (req, res, next) {
  try {
    await DeleteStoreService(2, req.params.store_id)

    res.send({ status: 'success' })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function SaleList (req, res, next) {
  try {
    const result = await SaleListService(2)

    res.send(result)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function UpdateProductInStore (req, res, next) {
  try {
    const { add_product, remove_product } = req.body

    await database_connection.transaction(async t => {
      await AddProductToStoreService(req.params.store_id, add_product)
      await RemoveProductFromStoreService(req.params.store_id, remove_product)
    })

    res.send({ status: 'success' })
  } catch (error) {
    console.log(error)
    next(error)
  }
}