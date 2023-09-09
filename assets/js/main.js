const pokemonOl = document.querySelector('.pokemons');

let limit = 1281;
let offset = 0;

async function handleClickPokemon(event) {
  const listItem = event.target.closest('li');
  if (listItem) {
    const pokemonName = listItem.querySelector('.name').textContent;
    const newPageURL = `details.html?name=${pokemonName}`;
    localStorage.setItem('pokemonName', pokemonName);
    window.location.href = newPageURL;
  } 
}

function createPokemon(pokemon) {
  const liElement = document.createElement('li');
  liElement.className = `pokemon ${pokemon.type}`;
  
  const headerDiv = document.createElement('div');
  headerDiv.className = 'pokemonHeader';
  headerDiv.innerHTML = `
    <span class="name">${pokemon.name}</span>  <span class="number">${pokemon.id}</span>
  `;

  const typesOl = document.createElement('div');
  typesOl.className = 'types';
  typesOl.innerHTML = pokemon.types.map((type) => `<span class="${type}">${type}</span>`).join('');

  const imgElement = document.createElement('img');
  imgElement.src = pokemon.image;

  const detailsDiv = document.createElement('div');
  detailsDiv.className = 'details';
  detailsDiv.appendChild(typesOl);
  detailsDiv.appendChild(imgElement);

  liElement.appendChild(headerDiv);
  liElement.appendChild(detailsDiv);

  return liElement;
}

pokeApi.getPokemonList().then((pokemonList = []) => {
  // listItens = pokemonList.map((e) => {
  //   pokeApi.getPokemon(e.url).then((pokemon) => createPokemon(pokemon))
  // const pokemonOl = document.querySelector('.pokemons');
  // listItens.push(createPokemon(pokemon));
  // pokemonOl.innerHTML += createPokemon(pokemon); 
  pokemonList.forEach((pokemon) => {
    const pokemonLi = createPokemon(pokemon);
    pokemonOl.appendChild(pokemonLi);
  });
  const pokemons = document.querySelector('.pokemons');
  pokemons.addEventListener('click', handleClickPokemon);
});

const btnNext = document.querySelector('#btnNext');
btnNext.addEventListener('click', () => {
  offset += 10;
  pokeApi.getPokemonList(offset, 10).then((pokemonList = []) => {
    const pokemonOl = document.querySelector('.pokemons');
    pokemonList.forEach((pokemon) => {
      const pokemonLi = createPokemon(pokemon);
      pokemonOl.appendChild(pokemonLi);
    });
  });
});

const btnPrev = document.querySelector('#btnPrev');
btnPrev.addEventListener('click', () => {
  offset -= 10;
  pokeApi.getPokemonList(offset, 10).then((pokemonList = []) => {
    const pokemonOl = document.querySelector('.pokemons');
    pokemonList.forEach((pokemon) => {
      const pokemonLi = createPokemon(pokemon);
      pokemonOl.appendChild(pokemonLi);
    });
  });
});

// function createTypesLi(types) {
//   return types.map((object) => `<li class="type">${object.type.name}</li>`);
// }

// function createPokemon(pokemon) {
//   return `
//   <li class="pokemon ${pokemon.type}">
//     <div class="pokemonHeader">
//       <span class="name">${pokemon.name}</span>  <span class="number">${pokemon.id}</span>
//     </div>
//   <div class="details">
//       <ol class="types">
//         ${pokemon.types.map((type) => `<li class="${type}">${type}</li>`).join('')}
//       </ol>
//       <img src="${pokemon.image}">
//   </div>
// </li> `;
// };
