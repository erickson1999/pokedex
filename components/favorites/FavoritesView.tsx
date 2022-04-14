import { Card, Grid, Text, Image } from "@nextui-org/react";
import React, { FC } from "react";
import { useRouter } from "next/router";
import { Pokemon } from "../../interfaces";
import { v4 as uuid } from "uuid";

import FavoriteCardPokemon from "./FavoriteCardPokemon";

interface Props {
  pokemonsInStorage: Pokemon[];
}

export const FavoritesView: FC<Props> = ({ pokemonsInStorage }) => {
  return (
    <Grid.Container gap={1}>
      {pokemonsInStorage.length > 0 ? (
        pokemonsInStorage.map((pokemon: Pokemon) => (
          <FavoriteCardPokemon key={uuid()} pokemon={pokemon} />
        ))
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Text css={{ textAlign: "center" }} h2>
            No pokemons in Favorites :c
          </Text>
        </div>
      )}
    </Grid.Container>
  );
};
