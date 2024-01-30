import { CreateCategory, DeleteCategory, CategoryInfo, CategoryList, UpdateCategory } from "#controller/category-controller.js";
import { Router } from "express";

export const category_route = Router()

category_route.get('/list', CategoryList)
category_route.get('/:category_id/info', CategoryInfo)
category_route.post('/create', CreateCategory)
category_route.put('/:category_id/update', UpdateCategory)
category_route.delete('/:category_id/delete', DeleteCategory)