import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { Grid, Image } from "@nextui-org/react";
import { Layout } from "../components/layouts";
import pokeApi from "../api/pokeApi";
import { PokemonListResponse, SmallPokemon } from "../interfaces";
import { PokemonCard } from "../components/pokemon";
import { useEffect } from "react";

interface Props {
  pokemons: SmallPokemon[];
}

const urlImg = (id: number) => {
  const baseUrlImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
  return baseUrlImg;
};

const HomePage: NextPage<Props> = ({ pokemons }) => {
  useEffect(() => {
    localStorage.setItem("listPokemons", JSON.stringify(pokemons));
  }, [pokemons]);
  return (
    <>
      <Layout title="Pokedex" isPokemonPage={false}>
        <Grid.Container gap={2} justify="center">
          {pokemons.map((pokemon) => {
            return <PokemonCard key={pokemon.id} pokemon={pokemon} />;
          })}
        </Grid.Container>
      </Layout>
    </>
  );
};
// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
  const addFieldsToData: SmallPokemon[] = data.results.map((pokemon, i) => {
    const idPokemon = i + 1;
    return {
      ...pokemon,
      img: urlImg(idPokemon),
      id: idPokemon,
    };
  });
  return {
    props: { pokemons: addFieldsToData },
  };
};

export default HomePage;
