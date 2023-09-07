// function createTypesLi(types) {
//   return types.map((object) => `<li class="type">${object.type.name}</li>`);
// }

function createPokemon(pokemon) {
  return `
  <li class="pokemon ${pokemon.type}">
    <div class="pokemonHeader">
      <span class="name">${pokemon.name}</span>  <span class="number">${pokemon.id}</span>
    </div>
  <div class="details">
      <ol class="types">
        ${pokemon.types.map((type) => `<li class="${type}">${type}</li>`).join('')}
      </ol>
      <img src="${pokemon.image}">
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