import axios from 'axios'
import models from '../models'
import BaseController from './base'
import { Op } from 'sequelize'

export default class CharacterController extends BaseController {
  CharacterController () { }

  async index (req, res) {
    const numero = req.body.numero

    if (numero <= 0) {
      return super.ErrorBadRequest(res, 'El numero ingresado no es valido')
    }

    const arrOfNumeros = []
    for (let i = 1; i <= numero; i++) {
      arrOfNumeros.push(i)
    }

    const param = arrOfNumeros.join(',')
    console.log(param)

    try {
      const data = await axios({
        method: 'get',
        url: `https://rickandmortyapi.com/api/character/${param}`
      })
      const response = data.data
      const filteredResponse = []
      response.forEach((character) => {
        const findedCharacter = {
          name: character.name,
          status: character.status,
          species: character.species,
          origin: character.origin.name
        }
        return filteredResponse.push(findedCharacter)
      })
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
    const searchedName = req.body.name

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
          const data = await axios({
            method: 'get',
            url: `https://rickandmortyapi.com/api/character/?name=${searchedName}`
          })
          const response = data.data.results
          const filteredResponse = []
          response.map((character) => {
            const findedCharacter = {
              name: character.name,
              status: character.status,
              species: character.species,
              origin: character.origin.name
            }
            return filteredResponse.push(findedCharacter)
          })
          return super.Success(res, filteredResponse)
        } catch (error) {
          return super.ErrorBadRequest(res, `algo no salio bien, ${error}`)
        }
      } else {
        return super.Success(res, searchedCharacter)
      }
    } catch (error) {
      return super.NotFound(res, `Algo ha salido mal: ${error}`)
    }
  }
}
