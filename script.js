const poke_container = document.getElementById('poke-container')
const pokemon_count = 150
const colors = {
    fire: '#FF5733',
    grass: '#CC9933',
	electric: '#20B2AA',
	water: '#7FFFD4',
	ground: '#CD853F',
	rock: '#d5d5d4',
	fairy: '#FA8072',
	poison: '#556B2F',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#7B68EE',
	flying: '#99CC33',
	fighting: '#B22222',
	normal: '#A9A9A9'
}

const main_types = Object.keys(colors)

const fetchPokemons = async () => {
    try {
        for (let i = 1; i <= pokemon_count; i++) {
            await getPokemon(i);
        }
    } catch (error) {
        console.error('Error fetching Pokémon:', error);
    }
}

const getPokemon = async (id) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        createPokemonCard(data);
    } catch (error) {
        console.error(`Error fetching Pokémon with ID ${id}:`, error);
    }
}

const createPokemonCard = (pokemon) => {
    const pokemonEl = document.createElement('div')
    pokemonEl.classList.add('pokemon')

    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
    const id = pokemon.id.toString().padStart(3, '0')

    const poke_types = pokemon.types.map(type => type.type.name)
    const type = main_types.find(type => poke_types.indexOf(type) > -1)
    const color = colors[type]

    pokemonEl.style.backgroundColor = color

    const pokemonInnerHTML = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"" alt="${name}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <span class="type">Type: <span>${type}</span></span>
    </div>
    `

    pokemonEl.innerHTML = pokemonInnerHTML

    poke_container.appendChild(pokemonEl)
}

fetchPokemons()
