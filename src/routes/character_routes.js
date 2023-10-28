import app from 'express'
import asyncHandler from 'express-async-handler'

import CharacterController from '../controllers/character_controller'

const routes = app.Router()

routes.get('/buscar', new CharacterController().index)
routes.post('/create', new CharacterController().create)
routes.get('/existe', new CharacterController().show)

export default routes
