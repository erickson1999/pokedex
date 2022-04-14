import React, { FC, MouseEvent, MouseEventHandler } from "react";
import { Card, Grid, Text, Image, Button } from "@nextui-org/react";

import confetti from "canvas-confetti";

import { Pokemon } from "../../interfaces";
interface Props {
  pokemon: Pokemon;
  pokemonInFavorites: Boolean;
  pokemonListInStorage: Pokemon[];
  setPokemonInFavorites: Function;
  nameStorage: string;
  setPokemonListInStorage: Function;
}

export const PokemonView: FC<Props> = ({
  pokemon,
  pokemonInFavorites,
  setPokemonInFavorites,
  nameStorage,
  pokemonListInStorage,
  setPokemonListInStorage,
}) => {
  const saveToFavorites = (e: MouseEvent) => {
    console.log(e);
    const { availHeight, availWidth } = window.screen;
    localStorage.setItem(
      nameStorage,
      JSON.stringify([...pokemonListInStorage, pokemon])
    );
    setPokemonInFavorites(true);
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: e.clientX / availWidth,
        y: e.clientY / availHeight,
      },
    });
  };
  const delToFavorites = () => {
    const newPokemons = pokemonListInStorage.filter(
      (pokemonStorage: Pokemon) => {
        if (pokemonStorage.name !== pokemon.name) {
          return true;
        }
        return false;
      }
    );
    setPokemonListInStorage(newPokemons);
    localStorage.setItem(nameStorage, JSON.stringify(newPokemons));
    setPokemonInFavorites(false);
  };
  return (
    <Grid.Container
      css={{ marginTop: "5px", width: "100%", margin: "0 auto" }}
      gap={2}
    >
      <Grid xs={12} sm={3}>
        <Card hoverable css={{ padding: "30px" }}>
          <Card.Image
            src={
              pokemon.sprites.other?.dream_world.front_default ||
              pokemon.sprites.front_default
            }
            alt={`image of pokemon ${pokemon.name}`}
            width="100%"
            height={200}
          />
          <Card.Body>
            <Text transform="uppercase" size={20} css={{ textAlign: "center" }}>
              Skills
            </Text>
            <Text>{`Power: ${pokemon.base_experience}`}</Text>
            <Text>{`Height: ${pokemon.height}`}</Text>
          </Card.Body>
        </Card>
      </Grid>
      <Grid xs={12} sm={9}>
        <Card>
          <Card.Header
            css={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            <Text
              h1
              transform="capitalize"
              css={{ textAlign: "center", display: "block" }}
            >
              {pokemon.name}
            </Text>
            {pokemonInFavorites ? (
              <Button
                style={{ background: "black", border: "3px solid white" }}
                onClick={delToFavorites}
              >
                In Favorites :)
              </Button>
            ) : (
              <Button style={{ background: "green" }} onClick={saveToFavorites}>
                Save
              </Button>
            )}
          </Card.Header>
          <Card.Body>
            <Text size={30}> Sprites:</Text>
            <Grid.Container direction="row">
              <Grid
                xs={12}
                sm={3}
                direction="column"
                css={{ textAlign: "center" }}
              >
                <Text>{"Front Default"}</Text>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={`Image to pokemon ${pokemon.name}`}
                  width={100}
                  height={100}
                ></Image>
              </Grid>
              <Grid
                xs={12}
                sm={3}
                direction="column"
                css={{ textAlign: "center" }}
              >
                <Text>{"Back Default"}</Text>
                <Image
                  src={pokemon.sprites.back_default}
                  alt={`Image to pokemon ${pokemon.name}`}
                  width={100}
                  height={100}
                ></Image>
              </Grid>
              <Grid
                xs={12}
                sm={3}
                direction="column"
                css={{ textAlign: "center" }}
              >
                <Text>{"Front Shiny"}</Text>

                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={`Image to pokemon ${pokemon.name}`}
                  width={100}
                  height={100}
                ></Image>
              </Grid>
              <Grid
                xs={12}
                sm={3}
                direction="column"
                css={{ textAlign: "center" }}
              >
                <Text>{"Back Shiny"}</Text>
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={`Image to pokemon ${pokemon.name}`}
                  width={100}
                  height={100}
                ></Image>
              </Grid>
            </Grid.Container>
          </Card.Body>
        </Card>
      </Grid>
    </Grid.Container>
  );
};
