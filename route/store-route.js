import { CreateStore, DeleteStore, SaleList, StoreInfo, StoreList, UpdateProductInStore, UpdateStore } from "#controller/store-controller.js";
import { Router } from "express";

export const store_route = Router()

store_route.get('/list', StoreList)
store_route.get('/:store_id/info', StoreInfo)
store_route.post('/create', CreateStore)
store_route.put('/:store_id/update', UpdateStore)
store_route.delete('/:store_id/delete', DeleteStore)

store_route.get('/sale', SaleList)
store_route.put('/:store_id/product/list', UpdateProductInStore)