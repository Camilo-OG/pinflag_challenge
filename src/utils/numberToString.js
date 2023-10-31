function numberToString (numero) {
  const arrDeNumeros = []
  for (let i = 1; i <= numero; i++) {
    arrDeNumeros.push(i)
  }
  const numDeCharacters = arrDeNumeros.join(',')
  return numDeCharacters
}

export default numberToString
