import Express from 'express'
import { config } from 'dotenv'
import { SetupDatabase } from '#config/database.js'
import { SetupRoute } from '#config/route.js'

config()

const server = Express()

export async function StartServer () {
  await SetupDatabase()
  SetupRoute(server)
  server.listen(process.env.PORT, () => {
    console.log('server listen on port:', process.env.PORT)
  })
}