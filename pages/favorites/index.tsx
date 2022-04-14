import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import { Text, Button, Container, Grid } from "@nextui-org/react";
import { FavoritesView } from "../../components/favorites/FavoritesView";
const nameStorage = "favoritesPokemons";

const Favorites = () => {
  const [pokemonsInStorage, setPokemonsInStorage] = useState([]);
  useEffect(() => {
    const favoritesPokemons = localStorage.getItem(nameStorage) || "[]";
    setPokemonsInStorage(JSON.parse(favoritesPokemons).reverse());
  }, []);
  const deleteAllFavorites = () => {
    const resConfirm = window.confirm(
      "sure you want to delete all your favorite pokemons?"
    );
    if (!resConfirm) return;
    localStorage.removeItem(nameStorage);
    setPokemonsInStorage([]);
  };
  return (
    <Layout title="Favorites" isPokemonPage={false}>
      <Container display="flex" alignItems="center" justify="center">
        <Text color="orange" css={{ textAlign: "center" }} h1>
          Favorites Pokemons
        </Text>
      </Container>
      <Container
        css={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          "@xs": { display: "flex", justifyContent: "center" },
          "@md": { display: "flex", justifyContent: "right" },
        }}
      >
        <Button
          onClick={deleteAllFavorites}
          color="error"
          css={{
            top: "0",
            position: "relative",
            "@xs": { top: "0" },
            "@md": { top: "-55px" },
          }}
        >
          Delete All
        </Button>
      </Container>

      <FavoritesView pokemonsInStorage={pokemonsInStorage}></FavoritesView>
    </Layout>
  );
};

export default Favorites;
