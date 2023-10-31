import supertest from 'supertest'
import app from '../index'
import models from '../models'

const api = supertest(app)

const characters = [
  {
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    origin: 'Earth (C-137)'
  },
  {
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    origin: 'Unknown'
  }
]

beforeEach(async () => {
  await models.Character.destroy({ where: {} })

  await models.Character.create(characters[0])
  await models.Character.create(characters[1])
})

describe('First endpoint /character/buscar/:numero', () => {
  test('Character are returned as json', async () => {
    await api
      .get('/character/buscar/1')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Returning an array of length 3', async () => {
    const response = await api.get('/character/buscar/3')
    expect(response.body).toHaveLength(3)
  })

  test('Param is NaN', async () => {
    await api.get('/character/buscar/c')
      .expect(400)
  })

  test('Param is a negative number', async () => {
    await api.get('/character/buscar/c')
      .expect(400)
  })
})
