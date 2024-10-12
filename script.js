const pokemonNome = document.querySelector('.pokemonNome');
const pokemonNumero = document.querySelector('.pokemonNumero');
const pokemonImage = document.querySelector('.pokemon');
const pokemonDescricao = document.querySelector('.pokemonDescricao');

const form = document.querySelector('.form');
const input = document.querySelector('.buscaPoke');
const btnAnterior = document.querySelector('.btn-Anterior');
const btnProximo = document.querySelector('.btn-Proximo');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200) {
        const dados = await APIResponse.json();
        return dados;
    }
}

const fetchPokemonSpecies = async (url) => {
    const APIResponse = await fetch(url);

    if (APIResponse.status === 200) {
        const speciesData = await APIResponse.json();
        return speciesData;
    }
};

const atualizaPokemon = async (pokemon) => {
    pokemonNome.innerHTML = 'Carregando...';
    pokemonNumero.innerHTML = '';
    pokemonImage.src="./images/mew.gif";

    const dados = await fetchPokemon(pokemon);

    if(dados) {
        pokemonImage.style.display = 'block';
        pokemonNome.innerHTML = dados.name;
        pokemonNumero.innerHTML = dados.id;
        pokemonImage.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        const speciesData = await fetchPokemonSpecies(dados.species.url);
        const englishDescription = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en');
            pokemonDescricao.innerHTML = englishDescription.flavor_text.replace(/[\n\f]/g, ' '); 
        searchPokemon = dados.id;
    } else {
        pokemonNome.innerHTML = 'Não encontrado'
        pokemonNumero.innerHTML = '';
        pokemonImage.src="./images/missigno.gif"
        pokemonDescricao.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    atualizaPokemon(input.value.toLowerCase());
});

btnAnterior.addEventListener('click', () => {
    if(searchPokemon > 1) {
        searchPokemon -=1;
        atualizaPokemon(searchPokemon);
    }
});

btnProximo.addEventListener('click', () => {
searchPokemon += 1;
atualizaPokemon(searchPokemon);
})

atualizaPokemon(searchPokemon)