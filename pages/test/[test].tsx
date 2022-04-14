import React from "react";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";

interface PropsInterface {
  data: DataInterface;
}

interface DataInterface {
  title: string;
}
const Test: NextPage<PropsInterface> = ({ data }) => {
  return <h1>{data.title}</h1>;
};

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [{ params: { test: "test-uno" } }, { params: { test: "test-dos" } }],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { test } = params as { test: string };
  const data = { title: `esta es la página ${test}` };
  return {
    props: { data },
  };
};

export default Test;
