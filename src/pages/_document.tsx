import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import { ColorModeScript } from "@chakra-ui/react";
import AppTheme from "../theme/AppTheme";

const description =
  "Official website for Lucid Creations Media. Where you can back us, donate to us, and purchase our official content such as hypno audio files.";

const logo = "images/logo.svg";
const logoOG = "/images/logo.png";

class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta name="theme-color" content="#3138dc" />
          <link rel="icon" href={logo} sizes="32x32 192x192" />
          <link rel="apple-touch-icon" href={logo} />
          <meta property="og:title" content="Lucid Creations Media Website" />
          <meta name="og:description" content={description} />
          <meta property="og:type" content="eCommerce" />
          <meta property="og:image" content={logoOG} />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:alt" content="Lucid Creations Media Logo" />
          <meta property="og:url" content="https://lucidcreations.media" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta property="title" content="Lucid Creations Media Website" />
          <meta name="description" content={description} />
          <meta property="type" content="eCommerce" />
          <meta property="image" content={logoOG} />
          <meta property="image:type" content="image/png" />
          <meta property="image:alt" content="Lucid Creations Media Logo" />
          <meta property="url" content="https://https://lucidcreations.media" />
          <meta httpEquiv="content-language" content="en_US" />
          <meta charSet="UTF-8" />
          <meta name="keywords" content={description} />
          <meta name="copyright" content="Lucid Creations Media" />
          <meta name="page-topic" content="eCommerce" />
          <meta name="audience" content="E" />
          <meta name="robots" content="index, follow" />
        </Head>
        <html lang="en" />
        <body>
          <ColorModeScript
            initialColorMode={AppTheme.config.initialColorMode}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
