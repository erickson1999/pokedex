import { Card, Grid, Text, Image } from "@nextui-org/react";
import { useRouter } from "next/router";
import React from "react";
import { Pokemon } from "../../interfaces/pokemon-full";

const FavoriteCardPokemon = ({ pokemon }: { pokemon: Pokemon }) => {
  const router = useRouter();
  const toPokemonPage = ({ name }: { name: string }) => {
    router.push(`/name/${name}`);
  };
  return (
    <Grid xs={12} md={3} xl={2} >
      <Card onClick={() => toPokemonPage(pokemon)} clickable hoverable>
        <Card.Header>
          <Text
            h3
            transform="capitalize"
            css={{ textAlign: "center", width: "100%" }}
          >
            {pokemon.name}
          </Text>
        </Card.Header>
        <Card.Body css={{ display: "flex", justifyContent: "center" }}>
          <Image
            alt={`Image of pokemon ${pokemon.name}`}
            width={200}
            height={200}
            src={
              pokemon.sprites.other?.dream_world.front_default ||
              pokemon.sprites.front_default
            }
          ></Image>
        </Card.Body>
      </Card>
    </Grid>
  );
};

export default FavoriteCardPokemon;
