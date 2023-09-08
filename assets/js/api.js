const pokeApi = {}

function pokeapiToPokemon(pokeapi) {
  const pokemon = new Pokemon()
  pokemon.id = pokeapi.id;
  pokemon.name = pokeapi.name;
  pokemon.image = pokeapi.sprites.other.dream_world.front_default;
  
  const types = pokeapi.types.map((type) => type.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.weight = pokeapi.weight;
  pokemon.height = pokeapi.height;

  const abilities = pokeapi.abilities.map((ability) => ability.ability.name);
  const [ability] = abilities;

  pokemon.abilities = abilities;

  return pokemon;
};

// https://pokeapi.co/api/v2/pokemon/9/
pokeApi.getPokemon = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(pokeapiToPokemon)
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
