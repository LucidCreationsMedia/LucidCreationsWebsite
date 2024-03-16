import { Button, Heading, Text, Link, VStack } from "@chakra-ui/react";
import React from "react";

const AboutProject = (): JSX.Element => {
  const description = `This project and website is a replacement for the current Lucid Creations Media Website. It is going to being designed to be faster, more user friendly, and better accessible compared to Wordpress. This platform is being built on React and Next.js`;

  return (
    <VStack
      justifyContent="center"
      alignContent="center"
      w="100%"
      my="10"
      px={{ base: "5vw", md: "15vw", lg: "20vw", xl: "30vw" }}
      spacing="4"
    >
      <Heading w="100%">{"About This Website"}</Heading>
      <Text w="100%">{description}</Text>
      <Link href="htps://lucidcreations.media" target="_blank" rel="noopener">
        <Button type="button" variant="secondary">
          <Text>{"Visit the current website"}</Text>
        </Button>
      </Link>
    </VStack>
  );
};

export default AboutProject;
