const rightSide = document.getElementById("rectangle1");
const frontSide = document.getElementById("frontSide");
const face1 = document.getElementById("face1");
const pokeContainer = document.getElementById("list");
const image = document.getElementById("image");
const pokeNumber = document.getElementById("number");
const pokeName = document.getElementById("name");


document.getElementById("polygon").addEventListener("click", function() {
  rightSide.style.display = "block";
  frontSide.style.display = "none";
  face1.style.display = "block";
});

document.getElementById("closeButton").addEventListener("click", function() {
  console.log("coucou");
  rightSide.style.display = "none";
  frontSide.style.display = "block";
  face1.style.display = "none";
});

const changePokemon = async () => {
  let randomNumber = Math.ceil(Math.random() * 150) + 1; // 1 et 151
  seePokemon(randomNumber);
};

const seePokemon = async (id) => {
	let requestString = `https://pokeapi.co/api/v2/pokemon/${id}`;

	let data = await fetch(requestString);
	console.log(data);
  
	let response = await data.json();
	console.log(response);
  image.src = response.sprites.front_default;
  pokeNumber.textContent = `#${response.id}`;
  pokeName.textContent = response.name;
};


const choosePokemon = async (e) => {
	let divId= e.target.id
	seePokemon(divId);
  };
  
changePokemon();
document.getElementById("button").addEventListener("click", changePokemon);



const pokemonsNumber = 151;
const colors = {
	fire: '#FDDFDF',
	grass: '#DEFDE0',
	electric: '#FCF7DE',
	water: '#DEF3FD',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#F5F5F5',
	fighting: '#E6E0D4',
	normal: '#F5F5F5'
};
const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
	for (let i = 1; i <= pokemonsNumber; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');
	pokemonEl.id= 'pokemon-'+pokemon.id;

	const poke_types = pokemon.types.map(type => type.type.name);
	const type = mainTypes.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];
  
	
	pokemonEl.style.backgroundColor = color;

	const pokeInnerHTML = `
            <p id="${pokemon.id}">#${pokemon.id
				.toString()
				.padStart(3, '0')}
			<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
							pokemon.id
						}.png" alt="${name}" style="width: 50px;"action="choosePokemon" id="${pokemon.id}" />
			</p>
    `;

	pokemonEl.innerHTML = pokeInnerHTML;

	pokeContainer.appendChild(pokemonEl);
	document.getElementById(pokemon.id).addEventListener("click", choosePokemon);
}

fetchPokemons();
