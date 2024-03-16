import { Heading, VStack } from "@chakra-ui/react";
import React from "react";
import WhatIMakeBanner from "./WhatIMakeBanner";
import AboutProject from "./AboutProject";

const TempHero = (): JSX.Element => {
  return (
    <VStack
      bg="brand.content"
      h="100%"
      w="100%"
      spacing="0"
      justifyContent="center"
      alignContent="center"
    >
      <WhatIMakeBanner />
      <AboutProject />
      <VStack
        w="100%"
        h="36.3vh"
        justifyContent="space-around"
        alignContent="center"
      >
        <Heading size="3xl" as="h2">
          {"Placeholder section"}
        </Heading>
      </VStack>
    </VStack>
  );
};

export default TempHero;
