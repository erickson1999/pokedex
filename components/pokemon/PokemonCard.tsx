import { Card, Grid, Row, Text } from "@nextui-org/react";
import Router from "next/router";
import React, { FC } from "react";
import { SmallPokemon } from "../../interfaces";
import { useRouter } from "next/router";
interface Props {
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
  const router = useRouter();
  const { id, name, img } = pokemon;
  const onClickCard = () => {
    router.push(`/name/${name}`);
  };
  return (
    <Grid xs={12} md={3}>
      <Card onClick={onClickCard} css={{ height: "325px" }} hoverable clickable>
        <Card.Body css={{ p: 3, textTransform: "capitalize" }}>
          <div style={{ display: "flex", alignItems: "center", height: "20%" }}>
            <Card.Header>
              <Row justify="center">
                <Text
                  css={{
                    textTransform: "capitalize",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {name}
                </Text>
              </Row>
            </Card.Header>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "80%",
            }}
          >
            <div
              style={{ height: "80%", display: "flex", alignItems: "center" }}
            >
              <Card.Image src={img} width="200px" height="200px" />
            </div>
            <div style={{ height: "20%" }}>
              <Card.Footer css={{ height: "10%" }}>
                <Row justify="flex-end">
                  <Text size="2rem" weight="bold">{`#${id}`}</Text>
                </Row>
              </Card.Footer>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Grid>
  );
};
