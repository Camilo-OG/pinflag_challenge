
const filterResponse = (response) => {
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
  return filteredResponse
}

export default filterResponse
