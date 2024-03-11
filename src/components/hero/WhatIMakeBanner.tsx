import React from "react";
import { Flex, HStack, Text, VStack } from "@chakra-ui/react";
import BrandText from "../../theme/components/BrandText";
import { Icon } from "@iconify/react";

const WhatIMakeBanner = (): JSX.Element => {
  return (
    <VStack
      bgColor="brand.cosmic"
      w="100%"
      alignContent="center"
      justifyContent="center"
      py="10"
      px={{ base: "0", lg: "5vw", "2xl": "10vw" }}
    >
      <VStack w="100%" alignContent="center" pb={{ base: "10", md: "6" }}>
        <BrandText type="Heading" headerLevel="h2" text={"What I Make"} />
      </VStack>
      <Flex
        w="100%"
        justifyContent="space-around"
        alignContent="center"
        direction={{ base: "column", md: "row" }}
        gap="5rem"
      >
        <VStack spacing="4" w="100%">
          <BrandText type="Heading" headerLevel="h3" text={"Communities"} />
          <VStack spacing="4" alignContent="start" justifyContent="center">
            <HStack spacing="4">
              <Text fontSize="5xl">
                <Icon icon="ic:baseline-discord" />
              </Text>
              <BrandText type="Text" size="xl" text={"Lucid's Cove"} />
            </HStack>
            <HStack spacing="4">
              <Text fontSize="5xl">
                <Icon icon="ic:baseline-telegram" />
              </Text>
              <BrandText type="Text" size="xl" text={"Lucid's Cove"} />
            </HStack>
          </VStack>
        </VStack>
        <VStack spacing="4" w="100%">
          <BrandText type="Heading" headerLevel="h3" text={"Content"} />
          <VStack spacing="4" alignContent="start" justifyContent="center">
            <HStack spacing="4" w="100%">
              <Text fontSize="5xl">
                <Icon icon="heroicons-solid:pencil" />
              </Text>
              <BrandText type="Text" size="xl" text={"Erotic Stories"} />
            </HStack>
            <HStack spacing="4" w="100%">
              <Text fontSize="5xl">
                <Icon icon="ic:baseline-telegram" />
              </Text>
              <BrandText type="Text" size="xl" text={"Hypno Audio Files"} />
            </HStack>
          </VStack>
        </VStack>
        <VStack spacing="4" w="100%">
          <BrandText type="Heading" headerLevel="h3" text={"Streams"} />
          <VStack spacing="4" alignContent="start" justifyContent="center">
            <HStack spacing="4">
              <Text fontSize="5xl">
                <Icon icon="mdi:twitch" />
              </Text>
              <BrandText type="Text" size="xl" text={"LucidKobold"} />
            </HStack>
            <HStack spacing="4">
              <Text fontSize="5xl">
                <Icon icon="ic:baseline-telegram" />
              </Text>
              <BrandText type="Text" size="xl" text={"LucidKobold"} />
            </HStack>
          </VStack>
        </VStack>
      </Flex>
    </VStack>
  );
};

export default WhatIMakeBanner;
