import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import { pokeApi } from "../../api";
import { GetStaticProps, NextPage } from "next";
import { GetStaticPaths } from "next";
import { Pokemon } from "../../interfaces";
import { PokemonView } from "../../components/pokemon/PokemonView";
import { localFavorites } from "../../utils";
import { refactoringDataPokemon } from "../../utils/refactoringDataPokemon";
interface Props {
  pokemon: Pokemon;
}
const nameStorage = "favoritesPokemons";
const PokemonPage: NextPage<Props> = ({ pokemon }) => {
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

const range = (start: number, stop: number, step = 1) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemonsIds = range(1, 151);
  return {
    paths: pokemonsIds.map((id: number) => ({
      params: { id: `${id}` },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);
  const pokemon = refactoringDataPokemon(data);
  return { props: { pokemon: pokemon } };
};
export default PokemonPage;
