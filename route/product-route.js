import { CreateProduct, DeleteProduct, ProductInfo, ProductList, UpdateProduct } from "#controller/product-controller.js";
import { Router } from "express";

export const product_route = Router()

product_route.get('/list', ProductList)
product_route.get('/:product_id/info', ProductInfo)
product_route.post('/create', CreateProduct)
product_route.put('/:product_id/update', UpdateProduct)
product_route.delete('/:product_id/delete', DeleteProduct)