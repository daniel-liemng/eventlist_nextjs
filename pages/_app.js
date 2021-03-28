import Head from "next/head";

import "../styles/globals.css";

import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta
          name='viewport'
          // page responsive and scale correctly
          content='initial-scale=1.0, width=device-width'
        ></meta>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
