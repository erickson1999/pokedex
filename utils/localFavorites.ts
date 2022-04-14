import { Pokemon } from "../interfaces";

const isInFavorites: Function = (pokemon: Pokemon): Boolean => {
  if (typeof window === "undefined") return false;
  const pokemonsInStorage = JSON.parse(
    localStorage.getItem("favoritesPokemons") || "[]"
  );
  let existPokemonInFavorites = pokemonsInStorage.find(
    (pokemonStorage: Pokemon) => pokemonStorage.name === pokemon.name
  );
  return existPokemonInFavorites ? true : false;
};
const exports = { isInFavorites };

export default exports;
