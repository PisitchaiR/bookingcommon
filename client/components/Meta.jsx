import Head from "next/head";
const Meta = ({ title }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.png" />
      <title>{title + " - common reserve"}</title>
    </Head>
  );
};

export default Meta;
