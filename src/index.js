document.addEventListener('DOMContentLoaded', () => {

  const cardContainer = document.getElementById("pokemon-container")
  const pokeSearchInput = document.getElementById("pokemon-search-input")
  let allPokemonData = []
  // console.log(pokeSearchInput);

  pokeSearchInput.addEventListener('input', function(event) {
    const userSearchTerm = event.target.value //value of target (input field)
    const filteredPokemon = allPokemonData.filter(function(pokemonObject) {
      return pokemonObject.name.includes(userSearchTerm);
    })
    const pokeHTML = renderAllPokemon(filteredPokemon);
    cardContainer.innerHTML = pokeHTML //refactor
  })

  cardContainer.addEventListener('click', (event) => {
    // if (event.target.nodeName === 'IMG') {
    //   console.log('clicked', event.target);
    // }
    if (event.target.dataset.action === 'flip') {
      const clickedPokemon = allPokemonData.find(function (pokemonObject) {
        return pokemonObject.id === parseInt(event.target.dataset.id)
      })
      if (event.target.src === clickedPokemon.sprites.front) {
        event.target.src = clickedPokemon.sprites.back
      } else {
        event.target.src = clickedPokemon.sprites.front
      }
    }
  })

  fetch('http://localhost:3000/pokemon/', { method: 'GET' })
    .then(function (responseObject) {
      // console.log(responseObject);
      return responseObject.json();
    })
    .then(function (parsedPokeJSON) {
      allPokemonData = parsedPokeJSON //reassigns variable to JSON array above so we can interact with it after the initial fetch
      // console.log(parsedPokeJSON);
      cardContainer.innerHTML = renderAllPokemon(parsedPokeJSON) //refactor
      // parsedPokeJSON.forEach(function (pokemonObject) {
      //   cardContainer.innerHTML += `
      //   <div class="pokemon-container">
      //     <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
      //       <h1 class="center-text">${pokemonObject.name}</h1>
      //       <div style="width:239px;margin:auto">
      //         <div style="width:96px;margin:auto">
      //         <img data-id="${pokemonObject.id}" data-action="flip" class="toggle-sprite" src="${pokemonObject.sprites.front}">
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      //   `
      // })
    })

}) //end of DOMContentLoaded

function renderAllPokemon(pokeCollection) {
  return pokeCollection.map(function (pokemonObject) {
    return `
    <div class="pokemon-container">
      <div style="width:230px;margin:10px;background:#fecd2f;color:#2d72fc" class="pokemon-frame">
        <h1 class="center-text">${pokemonObject.name}</h1>
        <div style="width:239px;margin:auto">
          <div style="width:96px;margin:auto">
          <img data-id="${pokemonObject.id}" data-action="flip" class="toggle-sprite" src="${pokemonObject.sprites.front}">
          </div>
        </div>
      </div>
    </div>
    `
  }).join('')
}
