import { database_connection } from "#config/database.js"
import { AddProductToPageService, CreatePageService, DeleteAllProductInPageService, PageListService, UpdatePageService } from "#service/page-service.js"

export async function PageList (req, res, next) {
  try {
    const result = await PageListService(2)

    res.send(result)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function CreatePage (req, res, next) {
  try {
    req.body.company_id = 2

    const page = await database_connection.transaction(async t => {
      const page = await CreatePageService(req.body, t)
      if (req.body.product) await AddProductToPageService(page.page_id, req.body.product, t)
      return page
    })

    res.send(page)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function UpdatePage (req, res, next) {
  try {
    await database_connection.transaction(async t => {
      await DeleteAllProductInPageService(req.params.page_id, t)
      await AddProductToPageService(req.params.page_id, req.body.product, t)
      await UpdatePageService(2, req.params.page_id, req.body.page, t)
    })

    res.send({ status: 'success' })
  } catch (error) {
    console.log(error)
    next(error)
  }
}