import axios from 'axios'

const searchByName = async (searchedName) => {
  const data = await axios({
    method: 'get',
    url: `https://rickandmortyapi.com/api/character/?name=${searchedName}`
  })
  return data.data.results
}

const searchByNumber = async (numDeCharacters) => {
  const data = await axios({
    method: 'get',
    url: `https://rickandmortyapi.com/api/character/${numDeCharacters}`
  })
  return data.data
}

export default {
  searchByName,
  searchByNumber
}
