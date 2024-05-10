import express from 'express'
import 'dotenv/config'
const app = express()
import router from './routes/index.js'
import cors from 'cors';

export const startServer = () => {
  const { PORT } = process.env
  app.use(express.json(), cors())
  app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded
  app.use('/api/v1', router)

  app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`)
  })
}
