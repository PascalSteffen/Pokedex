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
            let pokemonClassInPopUp = document.getElementById(`pokemonClassInPopUp${i}`);
            let pokemonClass = document.getElementById(`pokemonClass${i}`);

            pokemonClass.innerHTML += generateCurrentPokemonHTMLClass(currentPokemon, j);
            pokemonClassInPopUp.innerHTML += generateCurrentPokemonHTMLClass(currentPokemon, j);

            pokemonColorChange(currentPokemon, i);
        }

        if (pokedexId > 0 && pokedexId < 10) {
            document.getElementById(`newPokedexId${i}`).innerHTML = `0${pokedexId}`;
            document.getElementById(`newPokedexIdInPopUp${i}`).innerHTML = `0${pokedexId}`;
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

    <!-- Modal -->
    <div id="popUp${i}" class="d-none">
        <div class="pop-up-Container flex-center">
            <div id="classColorInPopUp${i}" class="pop-up-inline-container">
                <div class="flex-start mx-4 my-4 position">
                    <h1 class="name-in-pop-up">${newName}</h1>
                    <span class="pokedex-id-pop-up" id="newPokedexIdInPopUp${i}">${pokedexId}</span>
                    <img onclick="nextPokemon(${i})" class="next-img" src="img/next.png" alt="">
                    <img class="back-img" src="img/back.png" alt="">
                    <img onclick="closePopUp(${i})" class="cross-img" src="img/cross.png" alt="">
                </div>
                <div class="flex-column">
                    <img class="img-250" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}" alt="">
                    <div class="flex-center" id="pokemonClassInPopUp${i}"></div>
                </div>
                <div class="stats-bg px-3 py-3">
                    <h1>Hallo</h1>
                </div>
            </div>
        </div>
    </div>

    <div onclick="openPopUp(${i})" id="classColor${i}" class="target-container flex-start mx-5 my-4 px-4 py-4">
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
            <span class="target-container-child mx-2 px-3 py-1">${newClass}</span>
        </div>`
}


/**
 * Farbdarstellung aller Klassen.
 * @param {*} currentPokemon - JSON aus der "renderChrizard()" function.
 * @param {*} i - Holt die Mainfarbe des jeweiligen Pokemons aus dem Array.
 */
function pokemonColorChange(currentPokemon, i) {
    let classColor = document.getElementById(`classColor${i}`);
    let classColorInPopUp = document.getElementById(`classColorInPopUp${i}`)
    if (currentPokemon['types'][0]['type']['name'] == 'fire') {
        classColor.classList.add("fire-class");
        classColorInPopUp.classList.add("fire-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'grass' || currentPokemon['types'][0]['type']['name'] == 'bug') {
        classColor.classList.add("grass-class");
        classColorInPopUp.classList.add("grass-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'poison') {
        classColor.classList.add("poisen-class");
        classColorInPopUp.classList.add("poisen-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'water') {
        classColor.classList.add("water-class");
        classColorInPopUp.classList.add("water-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'normal') {
        classColor.classList.add("normal-class");
        classColorInPopUp.classList.add("normal-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'electric') {
        classColor.classList.add("electric-class");
        classColorInPopUp.classList.add("electric-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'ground') {
        classColor.classList.add("ground-class");
        classColorInPopUp.classList.add("ground-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'fairy') {
        classColor.classList.add("fairy-class");
        classColorInPopUp.classList.add("fairy-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'fighting') {
        classColor.classList.add("fighting-class");
        classColorInPopUp.classList.add("fighting-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'ghost') {
        classColor.classList.add("ghost-class");
        classColorInPopUp.classList.add("ghost-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'rock') {
        classColor.classList.add("rock-class");
        classColorInPopUp.classList.add("rock-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'psychic') {
        classColor.classList.add("psychic-class");
        classColorInPopUp.classList.add("psychic-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'dragon') {
        classColor.classList.add("dragon-class");
        classColorInPopUp.classList.add("dragon-class");
    } else if (currentPokemon['types'][0]['type']['name'] == 'ice') {
        classColor.classList.add("ice-class");
        classColorInPopUp.classList.add("ice-class");
    }
}


/*###############################################################################################################################################################*/


/**
 * Onclick Function
 */
function openPopUp(i) {
    document.getElementById(`popUp${i}`).classList.remove("d-none");
}

function closePopUp(i) {
    document.getElementById(`popUp${i}`).classList.add("d-none");
}

function nextPokemon(i, pokedexId) {
    i += 1;
    if (i >= pokedexId.length) {
        i = 0;
    }
}

function lastPokemon() {

}