import Head from "next/head";
import React from "react";

interface TitleProps {
  title: string;
}
/**
 * Used to change the title of the page.
 * @param {string} title the title of the page.
 */

const Title = ({ title }: TitleProps): JSX.Element => {
  return (
    <Head>
      <title>{`${title} | LCM Potty Chart`}</title>
      <meta property="og:title" content={`${title} | LCM Potty Chart`} />
      <meta property="title" content={`${title} | LCM Potty Chart`} />
    </Head>
  );
};

export default Title;
