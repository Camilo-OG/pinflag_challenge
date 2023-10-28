import app from 'express'

import HomeController from '../controllers/home_controller'

const routes = app.Router()
// const home_Controller = new HomeController()

routes.get('/', new HomeController().get)

export default routes
