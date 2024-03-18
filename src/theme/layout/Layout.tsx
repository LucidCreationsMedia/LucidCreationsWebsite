import React, { FC, ReactNode } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import Header from "../layout/Header";
import { Box } from "@chakra-ui/layout";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  elementType?: string;
}

const Layout: FC<LayoutProps> = (
  { children }: LayoutProps,
  { pageProps }: AppProps
) => {
  return (
    <Box w="100%">
      <Provider store={store}>
        <Header {...pageProps} />
        <main>{children}</main>
        <Footer />
      </Provider>
    </Box>
  );
};
export default Layout;
