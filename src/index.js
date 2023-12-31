import express from 'express'
import swaggerDocs from './documents/swagger'
import './config/environment'
import routes from './routes'
import './models'

const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use('/', routes)

const startServer = () => {
  app.listen(port, () => {
    console.log(`API running on http://127.0.0.1:${port}/`)
    swaggerDocs(app, port)
  })
}

startServer()

export default app
