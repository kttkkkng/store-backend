import { database_connection } from "#config/database.js"
import { CheckoutService, SaleHistoryService } from "#service/sale-service.js"
import { v4 as uuid } from "uuid"

export async function Checkout (req, res, next) {
  try {
    const sales = req.body
    sales.sale_uuid = uuid()
    sales.company_id = 2

    database_connection.transaction(async t => {
      await CheckoutService(sales)
    })

    res.send({ status: 'success' })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export async function SaleHistory (req, res, next) {
  try {
    const store_id = Number.isNaN(parseInt(req.params.store_id)) ? req.params.store_id : parseInt(req.params.store_id)

    const result = await SaleHistoryService(2, store_id)

    res.send(result)
  } catch (error) {
    console.log(error)
    next(error)
  }
}