
const API_URL = 'https://pokeapi.co/api/v2'

const ARTWORK_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'

async function request(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Помилка сервера: ${response.status}`)
  }

  return response.json()
}

function getIdFromUrl(url) {
  return Number(url.split('/').filter(Boolean).at(-1))
}


export async function getPokemonList() {
  const data = await request(`${API_URL}/pokemon?limit=2000`)

  return data.results.map((pokemon) => {
    const id = getIdFromUrl(pokemon.url)

    return {
      id,
      name: pokemon.name,
      image: `${ARTWORK_URL}/${id}.png`,
    }
  })
}

export async function getPokemonByType(type) {
  const data = await request(`${API_URL}/type/${type}`)

  return data.pokemon.map((item) => ({
    id: getIdFromUrl(item.pokemon.url),
    name: item.pokemon.name,
  }))
}


export async function getPokemonDetails(name) {
  return request(`${API_URL}/pokemon/${name}`)
}

