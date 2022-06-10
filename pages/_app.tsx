import React from "react";
import type { AppProps } from "next/app";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import Head from "next/head";
import ThirdwebGuideFooter from "../components/guide/ThirdwebGuideFooter";
import Header from "../components/Header";

// This is the chainId your dApp will work on.
const activeChainId = ChainId.Mumbai;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider desiredChainId={activeChainId}>
      <Head>
        <title>ERC1155</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="ERC1155"
        />
        <meta
          name="keywords"
          content="ERC1155"
        />
      </Head>
      <Header />
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
