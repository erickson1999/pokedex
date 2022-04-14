import Head from "next/head";
import { useRouter } from "next/router";
import React, { FC, ReactNode } from "react";
import { SmallPokemon } from "../../interfaces";
import { Navbar } from "../ui";

interface Props {
  title: String;
  isPokemonPage: boolean;
}
export const Layout: FC<Props> = ({ children, title, isPokemonPage }) => {
  const titleLowerCase = title.toLowerCase();
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Erickson Quispe" />
        <meta name="description" content={`Info sobre el pokemon ${title}`} />
        <meta name="keywords" content={`${title}, pokemon`} />
        {isPokemonPage && (
          <>
            <meta
              property="og:title"
              content={`Learn all about ${titleLowerCase} in this pokedex!`}
            />
            <meta
              property="og:description"
              content={`All the information you need about ${titleLowerCase} to be the best duelist`}
            />
            <meta
              property="og:image"
              content={`${
                typeof window !== "undefined" && window.location.origin
              }/img/banner.png`}
            />
          </>
        )}
      </Head>

      <Navbar />
      <main style={{ padding: "0 40px" }}>{children} </main>
    </>
  );
};
