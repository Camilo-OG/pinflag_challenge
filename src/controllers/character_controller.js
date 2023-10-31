import models from '../models'
import BaseController from './base'
import { Op } from 'sequelize'
import apiCall from '../utils/apiCall'
import filterResponse from '../utils/filterResponse'
import numberToString from '../utils/numberToString'

export default class CharacterController extends BaseController {
  CharacterController () { }

  async index (req, res) {
    const numero = req.params.numero

    if (numero <= 0 || numero >= 826 || isNaN(numero)) {
      return super.ErrorBadRequest(res, 'El numero ingresado no es valido')
    }

    const numDeCharacters = numberToString(numero)

    try {
      const response = await apiCall.searchByNumber(numDeCharacters)
      if (numDeCharacters === '1') {
        const filteredResponse = {
          name: response.name,
          status: response.status,
          species: response.species,
          origin: response.origin.name
        }
        return super.Success(res, filteredResponse)
      }
      const filteredResponse = filterResponse(response)
      return super.Success(res, filteredResponse)
    } catch (error) {
      return super.NotFound(res, `No se ha podido conectar a la API: ${error}`)
    }
  }

  async create (req, res) {
    const { name, status, species, origin } = req.body

    if (!name || !status || !species || !origin) {
      return super.ErrorBadRequest(res, 'Todos los campos son obligatorios')
    } else {
      try {
        const character = {
          name,
          status,
          species,
          origin
        }
        await models.Character.create(character)
        return super.Success(res, `Character "${name}" añadido con exito `)
      } catch (error) {
        return super.NotFound(res, `No se ha podido conectar a la API: ${error}`)
      }
    }
  }

  async show (req, res) {
    const searchedName = req.params.nombre

    if (!searchedName) {
      return super.ErrorBadRequest(res, 'Todos los campos son obligatorios')
    }
    try {
      const searchedCharacter = await models.Character.findOne({
        where: {
          name: {
            [Op.iLike]: `%${searchedName}%`
          }
        }
      })
      if (searchedCharacter === null) {
        try {
          const response = await apiCall.searchByName(searchedName)
          const filteredResponse = filterResponse(response)
          return super.Success(res, filteredResponse)
        } catch (error) {
          return super.ErrorBadRequest(res, `algo no salio bien, ${error}`)
        }
      } else {
        const filteredResponse = {
          name: searchedCharacter.name,
          status: searchedCharacter.status,
          species: searchedCharacter.species,
          origin: searchedCharacter.origin
        }
        return super.Success(res, filteredResponse)
      }
    } catch (error) {
      return super.NotFound(res, `Algo ha salido mal: ${error}`)
    }
  }
}
