const pokeApi = {}

  // https://pokeapi.co/api/v2/pokemon/9/
  pokeApi.getPokemon = (pokemon) => {
    return fetch(pokemon.url)
      .then((response) => response.json())
  }

pokeApi.getPokemonList = (offset = 0, limit = 10) => {
    // debugger **dica do professor**
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json())
    .then((json) => json.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemon))
    .then(details => Promise.all(details))
    .catch((error) => console.error(error))
    .finally(() => console.log('fetch finished'));
}
