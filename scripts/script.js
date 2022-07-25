let currentPokemon;
let allPokemon = 1156;
let offset = 0;
let limit = 20;

async function init() {
    await renderPokemon();

}

window.onscroll = async function () {
    var d = document.documentElement;
    var height1 = d.scrollTop + window.innerHeight;
    var height = d.offsetHeight;

    if (height1 == height) {
        offset += 20;
        limit += 20;
        await renderPokemon();
    }

};

/**
 * Rendert alle Pokemon
 */
async function renderPokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    let response = await fetch(url);
    let currentPokemon = await response.json();
    let pokemons = document.getElementById('pokemons');

    for (let i = 0; i < currentPokemon['results'].length; i++) {
        const element = currentPokemon['results'][i]['url'];
        const response = await fetch(element);
        const responsetAsJSON = await response.json();
        const pokedexId = responsetAsJSON['id'];

        pokemons.innerHTML += await generateCurrentPokemonContainer(responsetAsJSON, i, pokedexId);
        await renderPokemonStats(responsetAsJSON, i);
        await renderPokemonTypes(responsetAsJSON, i, pokedexId);

    }

}


/**
 * Rendert die Pokemon-Typen
 * @param {*} responsetAsJSON - JSON aus der "renderPokemon" function.
 * @param {*} i - Holt sich die jeweilige Stelle aus dem JSON.
 * @param {*} pokedexId - Holt sich die jeweilige ID.
 */
async function renderPokemonTypes(responsetAsJSON, i, pokedexId) {
    const types = responsetAsJSON['types'];

    for (let j = 0; j < types.length; j++) {
        let pokemonClassInPopUp = document.getElementById(`pokemonClassInPopUp${i}`);
        let pokemonClass = document.getElementById(`pokemonClass${i}`);

        pokemonClass.innerHTML += await generateCurrentPokemonHTMLClass(responsetAsJSON, j);
        pokemonClassInPopUp.innerHTML += await generateCurrentPokemonHTMLClass(responsetAsJSON, j);
        await pokemonColorChange(responsetAsJSON, i);
    }

    if (pokedexId > 0 && pokedexId < 10) {
        document.getElementById(`newPokedexId${i}`).innerHTML = `0${pokedexId}`;
        document.getElementById(`newPokedexIdInPopUp${i}`).innerHTML = `0${pokedexId}`;
    }
}


async function renderPokemonStats(responsetAsJSON, i) {
    const stats = responsetAsJSON['stats'];

    for (let k = 0; k < stats.length; k++) {
        let pokemonStats = document.getElementById(`pokemonStats${i}`)
        let statName = stats[k]['stat']['name'].charAt(0).toUpperCase() + stats[k]['stat']['name'].slice(1);
        pokemonStats.innerHTML += /*html*/ `
        <div>
            <div class="flex-center my-1">
                <span>${statName} (${stats[k]['base_stat']})</span>
            </div>
            <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated bg-black " role="progressbar" aria-label="Animated striped example" aria-valuenow="${stats[k]['base_stat']}" aria-valuemin="0" aria-valuemax="100" style="width: ${stats[k]['base_stat']}%"></div>
            </div>
        </div>`
    }
}


/**
 * Rendert den Namen und das Bild des Pokemons
 * @param {*} responsetAsJSON - JSON aus der "renderPokemon" function.
 * @returns 
 */
async function generateCurrentPokemonContainer(responsetAsJSON, i, pokedexId) {
    let PokemonName = responsetAsJSON['name'].charAt(0).toUpperCase() + responsetAsJSON['name'].slice(1);
    let PokemonHeight = responsetAsJSON['weight'] / 100;
    let PokemonWeight = responsetAsJSON['weight'] / 10;
    return /*html*/ `
    <!-- Modal -->
    <div id="popUp${i}" class="d-none">
        <div class="pop-up-Container flex-center">
            <div id="classColorInPopUp${i}" class="pop-up-inline-container">
                <div class="flex-start mx-4 my-4 position">
                    <h1 class="name-in-pop-up">${PokemonName}</h1>
                    <span class="pokedex-id-pop-up" id="newPokedexIdInPopUp${i}">${pokedexId}</span>
                    <img onclick="nextPokemon(${i})" class="next-img" src="img/next.png" alt="">
                    <img class="back-img" src="img/back.png" alt="">
                    <img onclick="closePopUp(${i})" class="cross-img" src="img/cross.png" alt="">
                </div>
                <div class="flex-column">
                    <img class="img-200" src="${responsetAsJSON['sprites']['other']['official-artwork']['front_default']}" alt="">
                    <div class="flex-center" id="pokemonClassInPopUp${i}"></div>
                </div>
                <div class="stats-bg px-3">
                    <div class="flex-center underline py-3">
                        <div class="flex-column">
                            <span><b>Größe</b></span>
                            <span>${PokemonHeight.toFixed(2).replace('.', ',')} m</span>
                        </div>
                        <div class="flex-column ms-4">
                            <span><b>Gewicht</b></span>
                            <span>${PokemonWeight.toFixed(2).replace('.', ',')} kg</span>
                        </div>
                    </div>
                    <div class="flex-center mt-2">
                        <span class="stats-headline">Basis-Statistik</span>
                    </div>
                    <div>
                        <span id="pokemonStats${i}"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Normal Container -->
    <div onclick="openPopUp(${i})" id="classColor${i}" class="target-container flex-start mx-5 my-4 px-4 py-4">
        <div class="flex-column-start">
            <h1><b>${PokemonName}</b></h1>
            <span class="pokedex-id" id="newPokedexId${i}">${pokedexId}</span>
            <div id="pokemonClass${i}"></div>
        </div>
        <div>
            <img class="icon-inline img-100" src="img/pokeball_icon.png" alt="">
        </div>
        <div>
            <img class="img-150 pokemon-img" src="${responsetAsJSON['sprites']['other']['official-artwork']['front_default']}" alt="">
        </div>
    </div>`
}


/**
 * Rendert die Klassen des Pokemons
 * @param {*} responsetAsJSON -JSON aus der "renderChrizard()" function.
 * @param {*} i - Holt sich die Anzahl der Klassen des jeweiligen Pokemons.
 * @returns 
 */
async function generateCurrentPokemonHTMLClass(responsetAsJSON, j) {
    let newClass = responsetAsJSON['types'][j]['type']['name'].charAt(0).toUpperCase() + responsetAsJSON['types'][j]['type']['name'].slice(1);
    return /*html*/ `
    <div class="my-2 flex-start">
        <span class="target-container-child mx-2 px-3 py-1">${newClass}</span>
    </div>`
}


/**
 * Farbdarstellung aller Klassen.
 * @param {*} responsetAsJSON - JSON aus der "renderChrizard()" function.
 * @param {*} i - Holt die Mainfarbe des jeweiligen Pokemons aus dem Array.
 */
async function pokemonColorChange(responsetAsJSON, i) {
    let classColor = document.getElementById(`classColor${i}`);
    let classColorInPopUp = document.getElementById(`classColorInPopUp${i}`)
    if (responsetAsJSON['types'][0]['type']['name'] == 'fire') {
        classColor.classList.add("fire-class");
        classColorInPopUp.classList.add("fire-class");
    } else if (responsetAsJSON['types'][0]['type']['name'] == 'grass' || responsetAsJSON['types'][0]['type']['name'] == 'bug') {
        classColor.classList.add("grass-class");
        classColorInPopUp.classList.add("grass-class");
    } else if (responsetAsJSON['types'][0]['type']['name'] == 'poison') {
        classColor.classList.add("poisen-class");
        classColorInPopUp.classList.add("poisen-class");
    } else if (responsetAsJSON['types'][0]['type']['name'] == 'water') {
        classColor.classList.add("water-class");
        classColorInPopUp.classList.add("water-class");
    } else if (responsetAsJSON['types'][0]['type']['name'] == 'normal') {
        classColor.classList.add("normal-class");
        classColorInPopUp.classList.add("normal-class");
    } else if (responsetAsJSON['types'][0]['type']['name'] == 'electric') {
        classColor.classList.add("electric-class");
        classColorInPopUp.classList.add("electric-class");
    } else if (responsetAsJSON['types'][0]['type']['name'] == 'ground') {
        classColor.classList.add("ground-class");
        classColorInPopUp.classList.add("ground-class");
    } else if (responsetAsJSON['types'][0]['type']['name'] == 'fairy') {
        classColor.classList.add("fairy-class");
        classColorInPopUp.classList.add("fairy-class");
    } else if (responsetAsJSON['types'][0]['type']['name'] == 'fighting') {
        classColor.classList.add("fighting-class");
        classColorInPopUp.classList.add("fighting-class");
    } else if (responsetAsJSON['types'][0]['type']['name'] == 'ghost') {
        classColor.classList.add("ghost-class");
        classColorInPopUp.classList.add("ghost-class");
    } else if (responsetAsJSON['types'][0]['type']['name'] == 'rock') {
        classColor.classList.add("rock-class");
        classColorInPopUp.classList.add("rock-class");
    } else if (responsetAsJSON['types'][0]['type']['name'] == 'psychic') {
        classColor.classList.add("psychic-class");
        classColorInPopUp.classList.add("psychic-class");
    } else if (responsetAsJSON['types'][0]['type']['name'] == 'dragon') {
        classColor.classList.add("dragon-class");
        classColorInPopUp.classList.add("dragon-class");
    } else if (responsetAsJSON['types'][0]['type']['name'] == 'ice') {
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

function nextPokemon(i, responsetAsJSON) {
    i += 1;
    if (i >= responsetAsJSON.length) {
        i = 0;
    }

    renderPokemon();
}

function lastPokemon() {

}