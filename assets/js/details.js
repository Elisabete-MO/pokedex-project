function createDetail(pokemon = {}) {
  const section = document.createElement('section');
  section.className = 'contentDetails';

  const headerDiv = document.createElement('div');
  headerDiv.className = `pokemonHeader ${pokemon.type}`;

  const btnBack = document.createElement('img');
  btnBack.id = 'btnBack';
  btnBack.src = './assets/img/left.png';
  headerDiv.appendChild(btnBack);

  const imgElement = document.createElement('img');
  imgElement.className = 'pokemonImg';
  imgElement.src = pokemon.image;
  headerDiv.appendChild(imgElement);

  const headerDiv1 = document.createElement('div');
  headerDiv1.className = 'pokemonHeader1';
  headerDiv1.innerHTML += `<span class="name">${pokemon.name}</span>`;

  const typesOl = document.createElement('ol');
  typesOl.className = 'types';
  typesOl.innerHTML += pokemon.types.map((type) => `<li class="${type}">${type}</li>`).join('');  
  headerDiv1.appendChild(typesOl);

  headerDiv.appendChild(headerDiv1);

  headerDiv.innerHTML += `<span class="number">${pokemon.id}</span>`;
  section.appendChild(headerDiv);

  const detailsDiv = document.createElement('div');
  detailsDiv.className = 'details';

  const titleSpan = document.createElement('span');
  titleSpan.className = 'title';
  titleSpan.textContent = 'About';
  detailsDiv.appendChild(titleSpan);

  const labelElement = document.createElement('label');
  labelElement.className = 'labelDetails';
  labelElement.textContent = `Height: ${pokemon.height/10} m`;
  detailsDiv.appendChild(labelElement);

  const labelElement1 = document.createElement('label');
  labelElement1.className = 'labelDetails';
  labelElement1.textContent = `Weight: ${pokemon.weight/10} kg`;
  detailsDiv.appendChild(labelElement1);

  const labelElement2 = document.createElement('label');
  labelElement2.className = 'labelDetails';
  labelElement2.textContent = `Abilities: ${pokemon.abilities.join(', ')}}`;
  detailsDiv.appendChild(labelElement2);

  section.appendChild(detailsDiv);

  return section;
}

async function getDetails() {
  const bodyElement = document.body;
  const footerElement = document.querySelector('.footer');
  const pokemonName = localStorage.getItem('pokemonName');
  const pokemon = await pokeApi.getPokemon(pokemonName);
  const detailSection = createDetail(pokemon)
  bodyElement.appendChild(detailSection);
  bodyElement.insertBefore(detailSection, footerElement);
  btnBack.addEventListener('click', () => {
    const newPageURL = `index.html`;
    window.location.href = newPageURL;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  getDetails();
});