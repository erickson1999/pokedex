import {
  useTheme,
  Text,
  Link,
  Input,
  Button,
  Container,
  Row,
  Col,
} from "@nextui-org/react";
import { Image } from "@nextui-org/react";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { FC, useState, useEffect } from "react";

export const Navbar: FC = () => {
  const route = useRouter();
  const { pathname } = route;
  const { theme } = useTheme();
  const router = useRouter();
  const [pokemonsList, setPokemonsList] = useState([]);
  useEffect(() => {
    setPokemonsList(JSON.parse(localStorage.getItem("listPokemons") || "[]"));
  }, []);
  const [valSearch, setValSearch] = useState("");
  const submitSearchForm = (e: any) => {
    e.preventDefault();
    if (valSearch) {
      const findPokemonName = pokemonsList.find(
        (pokemon: { name: string }) => pokemon.name === valSearch.toLowerCase()
      );
      findPokemonName
        ? router.push(`/name/${valSearch.toLowerCase()}`)
        : alert("pokemon no exist");
    } else {
      alert("Empty search field");
    }
    setValSearch("");
  };
  const handlerValSearch = (e: any) => {
    setValSearch(e.target.value);
  };
  return (
    <nav
      style={{
        display: "flex",
        width: "100%",
        padding: "10px 10px",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        backgroundColor: " rgba( 101, 101, 101 ,.5)",
        color: theme?.colors.primary.value,
      }}
    >
      <Container
        display="flex"
        justify="center"
        css={{
          flexWrap: "wrap",
          rowGap: "16px",
          padding: "0",
          "@sm": {
            flexWrap: "nowrap",
          },
        }}
      >
        <Container
          display="flex"
          justify="center"
          css={{ "@md": { justifyContent: "flex-start" } }}
        >
          <NextLink href="/" passHref>
            <Link
              css={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                "@md": {
                  justifyContent: "flex-start",
                },
              }}
            >
              <Image
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"
                alt="Icono de pokedex"
                width="70px"
                height="70px"
                containerCss={{ margin: "0" }}
              ></Image>
              <Container
                css={{
                  display: "flex",
                  alignItems: "center",
                  padding: "5px 5px 0",
                  margin: "0",
                }}
              >
                <Text color="white" h2>
                  P
                </Text>
                <Text color="white" h3>
                  okémon
                </Text>
              </Container>
            </Link>
          </NextLink>
        </Container>

        <Container
          display="flex"
          wrap="nowrap"
          alignItems="center"
          justify="center"
          css={{
            columnGap: "5px",
            "@md": {
              justifyContent: "flex-end",
            },
          }}
        >
          <form
            style={{ display: "flex", gap: "4px", borderRadius: "40px" }}
            onSubmit={submitSearchForm}
          >
            <Input
              placeholder="Pokemon name..."
              bordered
              borderWeight="bold"
              onChange={handlerValSearch}
              value={valSearch}
              aria-label="input search for name"
            />
            <Button
              css={{ width: "5rem", minWidth: "3rem" }}
              color="warning"
              flat
              auto
              type="submit"
            >
              Search
            </Button>
          </form>
          {pathname !== "/favorites" && (
            <NextLink href="/favorites" passHref>
              <Link>
                <Text color="white">Favorites</Text>
              </Link>
            </NextLink>
          )}
        </Container>
      </Container>
    </nav>
  );
};
