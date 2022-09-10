let currentPokemon;
let pokedexId;
let allPokemons = 20;
let loading = false;

function isScrolled() {
    return window.scrollY + window.innerHeight >= document.body.clientHeight && !loading; // Berechnet wie viel Vertikal gesrcolled.
}


window.onscroll = async function () {
    if (isScrolled()) {
        loading = true;
        let nextPokemons = allPokemons + 5;
        for (i = allPokemons; i < nextPokemons; i++) {
            let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            let response = await fetch(url);
            currentPokemon = await response.json();
            pokedexId = currentPokemon['id'];
            pokemons.innerHTML += await generateCurrentPokemonContainer(i);
            await renderPokemonStats(i);
            await renderPokemonTypes(i);
        }
        allPokemons += 5;
        loading = false;
    }
}


async function init() {
    await renderPokemon();
}


/**
 * Rendert alle Pokemon
 */
async function renderPokemon() {
    for (let i = 1; i < allPokemons; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        pokedexId = currentPokemon['id'];

        let pokemons = document.getElementById('pokemons');

        pokemons.innerHTML += await generateCurrentPokemonContainer(i);
        await renderPokemonStats(i);
        await renderPokemonTypes(i);
    }
}


/**
 * Rendert die Pokemon-Typen
 * @param {*} currentPokemon - JSON aus der "renderPokemon" function.
 * @param {*} i - Holt sich die jeweilige Stelle aus dem JSON.
 * @param {*} pokedexId - Holt sich die jeweilige ID.
 */
async function renderPokemonTypes(i) {
    const types = currentPokemon['types'];

    for (let j = 0; j < types.length; j++) {
        let pokemonClassInPopUp = document.getElementById(`pokemonClassInPopUp${i}`);
        let pokemonClass = document.getElementById(`pokemonClass${i}`);

        pokemonClass.innerHTML += await generateCurrentPokemonHTMLClass(j);
        pokemonClassInPopUp.innerHTML += await generateCurrentPokemonHTMLClass(j);
        await pokemonColorChange(i);
    }

    if (pokedexId > 0 && pokedexId < 10) {
        document.getElementById(`newPokedexId${i}`).innerHTML = `0${pokedexId}`;
        document.getElementById(`newPokedexIdInPopUp${i}`).innerHTML = `0${pokedexId}`;
    }
}


async function renderPokemonStats(i) {
    const stats = currentPokemon['stats'];

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
 * @param {*} currentPokemon - JSON aus der "renderPokemon" function.
 * @returns 
 */
async function generateCurrentPokemonContainer(i) {
    let PokemonName = currentPokemon['name'].charAt(0).toUpperCase() + currentPokemon['name'].slice(1);
    let PokemonHeight = currentPokemon['weight'] / 100;
    let PokemonWeight = currentPokemon['weight'] / 10;
    return /*html*/ `
    <!-- Modal -->
    <div id="popUp${i}" class="d-none">
        <div class="pop-up-Container flex-center">
            <div id="classColorInPopUp${i}" class="pop-up-inline-container">
                <div class="flex-start mx-4 my-4 position">
                    <h1 class="name-in-pop-up">${PokemonName}</h1>
                    <span class="pokedex-id-pop-up" id="newPokedexIdInPopUp${i}">${pokedexId}</span>
                    <img onclick="nextPokemon(${i})" class="next-img" src="img/next.png" alt="">
                    <img onclick ="lastPokemon(${i})"class="back-img" src="img/back.png" alt="">
                    <img onclick="closePopUp(${i})" class="cross-img" src="img/cross.png" alt="">
                </div>
                <div class="flex-column">
                    <img class="img-200" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}" alt="">
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
            <img class="img-150 pokemon-img" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}" alt="">
        </div>
    </div>`
}


/**
 * Rendert die Klassen des Pokemons
 * @param {*} currentPokemon - JSON aus der "renderPokemon" function.
 * @param {*} i - Holt sich die Anzahl der Klassen des jeweiligen Pokemons.
 * @returns 
 */
async function generateCurrentPokemonHTMLClass(j) {
    let newClass = currentPokemon['types'][j]['type']['name'].charAt(0).toUpperCase() + currentPokemon['types'][j]['type']['name'].slice(1);
    return /*html*/ `
    <div class="my-2 flex-start">
        <span class="target-container-child mx-2 px-3 py-1">${newClass}</span>
    </div>`
}


/**
 * Farbdarstellung aller Klassen.
 * @param {*} currentPokemon - JSON aus der "renderPokemon" function.
 * @param {*} i - Holt die Mainfarbe des jeweiligen Pokemons aus dem Array.
 */
async function pokemonColorChange(i) {
    let classColor = document.getElementById(`classColor${i}`);
    let classColorInPopUp = document.getElementById(`classColorInPopUp${i}`)
    classColor.classList.add(currentPokemon['types'][0]['type']['name']);
    classColorInPopUp.classList.add(currentPokemon['types'][0]['type']['name']);
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


function nextPokemon(i) {
    closePopUp(i);
    i += 1;
    if (i >= allPokemons) {
        i = 1;
    }
    openPopUp(i);
}


function lastPokemon(i) {
    closePopUp(i);
    i -= 1;
    if (i >= allPokemons) {
        i = 1;
    }
    if (i < 1) {
        i = allPokemons - 1;
    }
    openPopUp(i);
}


/*###############################################################################################################################################################*/


/**
 * Search function
 */
async function filterNames() {
    let search = document.getElementById("search").value;
    search = search.toLowerCase();
    pokemons.innerHTML = "";
    for (let i = 1; i < allPokemons; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        let numberOfNames = currentPokemon['name'];
        if (numberOfNames.toLowerCase().includes(search)) {
            pokedexId = currentPokemon['id'];
            pokemons.innerHTML += await generateCurrentPokemonContainer(i);
            await renderPokemonStats(i);
            await renderPokemonTypes(i);
        }
    }
}