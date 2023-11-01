import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import options from './openapi.json'

const swaggerDocs = (app, port) => {
  app.use('/character/docs', swaggerUi.serve, swaggerUi.setup(options))
  app.get('/character/docs.js', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(options)
  })
  console.log(`Version 1 Docs are avaible at http://127.0.0.1:${port}/character/docs`)
}

export default swaggerDocs
