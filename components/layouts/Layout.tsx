import Head from "next/head";
import React, { FC, ReactNode } from "react";
import { Navbar } from "../ui";

interface Props {
  title: String;
  isPokemonPage: boolean;
}
export const Layout: FC<Props> = ({ children, title, isPokemonPage }) => {
  const titleLowerCase = title.toLowerCase();

  const getUrlImg = () => {
    return `${
      typeof window !== "undefined" && window.location.origin
    }/img/banner.png`;
  };
  const getUrlPage = () => {
    return `${
      typeof window !== "undefined" && window.location.origin
    }/name/${titleLowerCase}`;
  };
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
            <meta property="og:image" content={getUrlImg()} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={getUrlPage()} />
            <meta
              property="og:keywords"
              content={`pokemon, pokedex, ${titleLowerCase}`}
            />
            <meta property="og:image:secure_url" content={getUrlImg()} />
            <link rel="image_src" href={getUrlImg()} />
          </>
        )}
        <meta property="og:image" content="https://pokedex-ericksonrqc.vercel.app/img/banner.png" />
      </Head>

      <Navbar />
      <main style={{ padding: "0 40px" }}>{children} </main>
    </>
  );
};
