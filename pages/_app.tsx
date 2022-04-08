import type { AppProps } from "next/app";

import Head from "next/head";
import React, { Fragment } from "react";

function LucidCreationWebsite({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/logo/favicon/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Fragment>
  );
}

export default LucidCreationWebsite;
