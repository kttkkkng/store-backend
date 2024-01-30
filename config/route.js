import { ErrorHandler } from '#middleware/error-middleware.js'
import { auth_route } from '#route/auth-route.js'
import { json } from 'express'
import cors from 'cors'
import { store_route } from '#route/store-route.js'
import { product_route } from '#route/product-route.js'
import { category_route } from '#route/category-route.js'

/** @param {import('express').Express} server */
export function SetupRoute (server) {
  server.use(cors({
    origin: '*',
  }))
  server.use(json({ limit: '200mb' }))

  server.get('/', (_, res) => res.send('store backend'))

  server.use('/auth', auth_route)
  server.use('/store', store_route)
  server.use('/product', product_route)
  server.use('/category', category_route)

  server.use(ErrorHandler)
  server.use('/*', (_, res) => res.status(404).send('path not found'))

  console.log('successfully setup routes')
}