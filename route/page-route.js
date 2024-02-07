import { CreatePage, PageList, UpdatePage } from "#controller/page-controller.js";
import { Router } from "express";

export const page_route = Router()

page_route.get('/list', PageList)
page_route.post('/create', CreatePage)
page_route.put('/:page_id/update', UpdatePage)