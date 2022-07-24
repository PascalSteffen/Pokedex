let currentPokemon;


async function init() {
    await renderPokemon();

}


/**
 * Render Charmander Pokemon
 */
async function renderPokemon() {
    for (let i = 1; i < 20; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        let types = currentPokemon['types'];
        let pokemons = document.getElementById('pokemons');
        let pokedexId = currentPokemon['id'];
        pokemons.innerHTML += generateCurrentPokemonContainer(currentPokemon, i, pokedexId);

        for (let j = 0; j < types.length; j++) {
            let pokemonClass = document.getElementById(`pokemonClass${i}`);
            pokemonClass.innerHTML += generateCurrentPokemonHTMLClass(currentPokemon, j);

            pokemonColorChange(currentPokemon, i);
        }

        if (pokedexId > 0 && pokedexId < 10) {
            document.getElementById(`newPokedexId${i}`).innerHTML = `0${pokedexId}`;
        }
    }

}


/**
 * Rendert den Namen und das Bild des Pokemons
 * @param {*} currentPokemon - JSON aus der "renderChrizard()" function.
 * @returns 
 */
function generateCurrentPokemonContainer(currentPokemon, i, pokedexId) {
    let newName = currentPokemon['name'].charAt(0).toUpperCase() + currentPokemon['name'].slice(1);


    return /*html*/ `
    <div id="classColor${i}" class="target-container flex-start mx-5 my-4 px-4 py-4">
        <div class="flex-column-start">
            <h1><b>${newName}</b></h1>
            <span class="pokedex-id" id="newPokedexId${i}">${pokedexId}</span>
            <div id="pokemonClass${i}"></div>
        </div>
        <div>
            <img class="icon-inline img-100" src="img/pokeball_icon.png" alt="">
        </div>
        <div>
            <img class="img-150 pokemon-img" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}" alt="">
        </div>
    </div>`
}


/**
 * Rendert die Klassen des Pokemons
 * @param {*} currentPokemon -JSON aus der "renderChrizard()" function.
 * @param {*} i - Holt sich die Anzahl der Klassen des jeweiligen Pokemons.
 * @returns 
 */
function generateCurrentPokemonHTMLClass(currentPokemon, j) {
    let newClass = currentPokemon['types'][j]['type']['name'].charAt(0).toUpperCase() + currentPokemon['types'][j]['type']['name'].slice(1);
    return /*html*/ `
        <div class="my-2 flex-start">
            <span class="target-container-child px-3 py-1">${newClass}</span>
        </div>`
}


/**
 * Farbdarstellung aller Klassen.
 * @param {*} currentPokemon - JSON aus der "renderChrizard()" function.
 * @param {*} i - Holt die Mainfarbe des jeweiligen Pokemons aus dem Array.
 */
function pokemonColorChange(currentPokemon, i) {
    let classColor = document.getElementById(`classColor${i}`);
    if (currentPokemon['types'][0]['type']['name'] == 'fire') {
        classColor.classList.add("fire-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'grass' || currentPokemon['types'][0]['type']['name'] == 'bug') {
        classColor.classList.add("grass-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'poison') {
        classColor.classList.add("poisen-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'water') {
        classColor.classList.add("water-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'normal') {
        classColor.classList.add("normal-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'electric') {
        classColor.classList.add("electric-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'ground') {
        classColor.classList.add("ground-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'fairy') {
        classColor.classList.add("fairy-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'fighting') {
        classColor.classList.add("fighting-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'ghost') {
        classColor.classList.add("ghost-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'rock') {
        classColor.classList.add("rock-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'psychic') {
        classColor.classList.add("psychic-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'dragon') {
        classColor.classList.add("dragon-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'ice') {
        classColor.classList.add("ice-class");
    }
}