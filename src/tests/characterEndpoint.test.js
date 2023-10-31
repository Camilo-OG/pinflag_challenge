import supertest from 'supertest'
import app from '../index'
import models from '../models'
import { response } from 'express'

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
const firstCharacter = {
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  origin: 'Earth (C-137)'
}

beforeEach(async () => {
  await models.Character.destroy({ where: {} })

  await api.post('/character/create').send(characters[0])
  await api.post('/character/create').send(characters[1])
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

  test('Content of the first character', async () => {
    const response = await api.get('/character/buscar/1')
    expect(response.body).toStrictEqual(firstCharacter)
  })
})
describe('Second endpoint /create', () => {
  test('A valid character can be added', async () => {
    const characterToAdd = {
      name: 'Gotron',
      status: 'Unknown',
      species: 'Robot',
      origin: 'Earth (Replacement Dimension)'
    }
    await api
      .post('/character/create')
      .send(characterToAdd)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('Character with a missing value', async () => {
    const characterToAdd = {
      name: 'Gotron',
      status: 'Unknown',
      species: 'Robot'
    }
    await api
      .post('/character/create')
      .send(characterToAdd)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
  test('empty character', async () => {
    await api
      .post('/character/create')
      .send()
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })
})

describe('Third endpoint /character/existe/:nombre', () => {
  test('Find a character with name rick in local DB', async () => {
    const response = await api.get('/character/existe/rick')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toStrictEqual(characters[0])
  })

  test('Find a character with empty name', async () => {
    await api.get('/character/existe/')
      .expect(404)
  })

  test('Find a character that doesn\'t exist in local DB', async () => {
    await api.get('/character/existe/morty')
      .expect(200)
  })

  test('Find a character with name morty in external DB', async () => {
    await api.get('/character/existe/rick')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})
