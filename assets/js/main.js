function createTypesLi(types) {
  return types.map((object) => `<li class="type">${object.type.name}</li>`);
}

function createPokemon(pokemon) {
  return `
  <li class="pokemon">
    <div class="pokemonHeader">
      <span class="name">${pokemon.name}</span>  <span class="number">${pokemon.id}</span>
    </div>
  <div class="details">
      <ol class="types">
        ${createTypesLi(pokemon.types).join('')}
      </ol>
      <img src="${pokemon.sprites.other.dream_world.front_default}">
  </div>
</li> `;
};

pokeApi.getPokemonList().then((pokemonList = []) => {
  // listItens = pokemonList.map((e) => {
  //   pokeApi.getPokemon(e.url).then((pokemon) => createPokemon(pokemon))
  // const pokemonOl = document.querySelector('.pokemons');
  // listItens.push(createPokemon(pokemon));
  // pokemonOl.innerHTML += createPokemon(pokemon); 
  const pokemonOl = document.querySelector('.pokemons');
  pokemonOl.innerHTML = pokemonList.map(createPokemon).join('');
});