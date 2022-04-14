import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import { pokeApi } from "../../api";
import { GetStaticProps, NextPage } from "next";
import { GetStaticPaths } from "next";
import { Pokemon } from "../../interfaces";
import { PokemonView } from "../../components/pokemon/PokemonView";
import { refactoringDataPokemon } from "../../utils/refactoringDataPokemon";
interface Props {
  pokemon: Pokemon;
}
const nameStorage = "favoritesPokemons";
const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  const [pokemonListInStorage, setPokemonListInStorage] = useState([]);
  const [pokemonInFavorites, setPokemonInFavorites] = useState(false);
  useEffect(() => {
    const pokemonsInStorage = JSON.parse(
      localStorage.getItem(nameStorage) || "[]"
    );
    //set pokemon in favorites
    setPokemonListInStorage(pokemonsInStorage);
    //check if pokemon is in favorites
    if (pokemonsInStorage !== []) {
      const existPokemonInFavorites = pokemonsInStorage.find(
        (pokemonStorage: Pokemon) => pokemonStorage.name === pokemon.name
      );
      existPokemonInFavorites && setPokemonInFavorites(true);
    }
  }, [pokemon]);

  return (
    <Layout title={`${pokemon.name}`.toUpperCase()} isPokemonPage={true}>
      <PokemonView
        pokemon={pokemon}
        nameStorage={nameStorage}
        pokemonInFavorites={pokemonInFavorites}
        setPokemonInFavorites={setPokemonInFavorites}
        pokemonListInStorage={pokemonListInStorage}
        setPokemonListInStorage={setPokemonListInStorage}
      ></PokemonView>
    </Layout>
  );
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
interface PokemonInterface {
  name: string;
  url: string;
}
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const limit = 151;
  const { data } = await pokeApi.get(`/pokemon?limit=${limit}`);
  const pokemonNames: string[] = data.results.map(
    (pokemon: PokemonInterface) => pokemon.name
  );
  return {
    paths: pokemonNames.map((name: string) => ({
      params: { name },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${name}`);
  const pokemon = refactoringDataPokemon(data);

  return { props: { pokemon } };
};
export default PokemonByNamePage;
