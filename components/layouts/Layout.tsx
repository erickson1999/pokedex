import Head from "next/head";
import React, { FC, ReactNode } from "react";
import { Navbar } from "../ui";

interface Props {
  title: String;
  isPokemonPage: boolean;
}

console.log({ test: "test de ejecucion" });
const origin = typeof window === "undefined" ? "" : window.location.origin;

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
            <meta property="og:image" content={`${origin}/img/banner.png`} />
            <meta property="og:type" content="website" />
            <meta
              property="og:url"
              content={`${origin}/name/${titleLowerCase}`}
            />
            <meta
              property="og:keywords"
              content={`pokemon, pokedex, ${titleLowerCase}`}
            />
            <link rel="image_src" href={`${origin}/img/banner.png`} />
          </>
        )}
      </Head>

      <Navbar />
      <main style={{ padding: "0 40px" }}>{children} </main>
    </>
  );
};
