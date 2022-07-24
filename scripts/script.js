let currentPokemon;

async function init() {
    await renderCharizard();

}

/**
 * Render Charmander Pokemon
 */
async function renderCharizard() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charizard';
    let response = await fetch(url);
    let currentPokemon = await response.json();
    let types = currentPokemon['types'];
    let charizard = document.getElementById("charizard");
    let charizardClass = document.getElementById("currentPokemonClass");

    charizard.innerHTML = generateCurrentPokemonContainer(currentPokemon);

    for (let i = 0; i < types.length; i++) {

        charizardClass.innerHTML += generateCurrentPokemonHTMLClass(currentPokemon, i);
    }


}


function generateCurrentPokemonContainer(currentPokemon) {
    let newName = currentPokemon['name'].charAt(0).toUpperCase() + currentPokemon['name'].slice(1);
    return /*html*/ `
    <div class="target-container flex-center mx-4 my-4 px-4 py-4">
        <div class="flex-column-start">
            <h1><b>${newName}</b></h1>
            <div id="currentPokemonClass"></div>
        </div>
        <div>
            <img class="icon-inline img-100" src="img/pokeball_icon.png" alt="">
        </div>
        <div>
            <img class="img-150 pokemon-img mx-2" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}" alt="">
        </div>
    </div>`
}

function generateCurrentPokemonHTMLClass(currentPokemon, i) {
    let newClass = currentPokemon['types'][i]['type']['name'].charAt(0).toUpperCase() + currentPokemon['types'][i]['type']['name'].slice(1);
    return /*html*/ `
        <div>
            <span class="target-container-child px-3 py-1 my-2">${newClass}</span>
        </div>

    `
}