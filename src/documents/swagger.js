import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    pinflagApi: '1.0.0',
    info: {
      title: 'Pinflag-Challenge',
      version: '1.0.0'
    }
  },
  apis: ['src/routes/index.js', 'src/config/sequelize.js']
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerDocs = (app, port) => {
  app.use('/character/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  app.get('/character/docs.js', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
  console.log(`Version 1 Docs are avaible at http://127.0.0.1:${port}/character/docs`)
}

export default swaggerDocs