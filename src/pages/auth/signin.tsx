import React from "react";
import { useRouter } from "next/router";
import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";
import {
  getProviders,
  signIn,
  getSession,
  LiteralUnion,
  ClientSafeProvider
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";
import SignInButton from "../../components/auth/buttons/SignInButton";
import EmailForm from "../../components/auth/EmailForm";
import Title from "../../components/title";

interface SignInPageProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}

const SignInPage = ({ providers }: SignInPageProps): JSX.Element => {
  const router = useRouter();
  const { error } = router.query;

  const errorType = (error: string): string => {
    switch (error) {
      case "OAuthSignin":
        return "Try signing in with a different account.";
      case "OAuthCallback":
        return "Try signing in with a different account.";
      case "OAuthCreateAccount":
        return "Try signing in with a different account.";
      case "EmailCreateAccount":
        return "Try signing in with a different account.";
      case "Callback":
        return "Try signing in with a different account.";
      case "OAuthAccountNotLinked":
        return "To confirm your identity, sign in with the same account you used originally.";
      case "EmailSignin":
        return "The e-mail could not be sent.";
      case "CredentialsSignin":
        return "Sign in failed. Check the details you provided are correct.";
      case "SessionRequired":
        return "Please sign in to access this page.";
      default:
        return "Unable to sign in.";
    }
  };

  return (
    <VStack
      h="100%"
      w="100%"
      my="24vh"
      justifyContent="center"
      alignContent="center"
    >
      <Title title="Signin" />
      <VStack
        h="auto"
        w={{ base: "95vw", sm: "90vw", md: "85vw", lg: "65vw" }}
        px={12}
        py={10}
        justifyContent="center"
        alignItems="center"
        border="1px solid #0068ff"
        borderRadius="2xl"
        boxShadow="rgba(0, 134, 255, 0.5) 0px 0px 15px, rgba(0, 134, 255, 0.3) 0px 0px 3px 1px"
        spacing={6}
      >
        <VStack
          h="100%"
          w="100%"
          justifyContent="center"
          alignContent="center"
          spacing={6}
        >
          <Image
            h="10rem"
            w="10rem"
            src="/images/logo.svg"
            alt="LCM Potty Chart Logo"
          />
          <VStack
            h="100%"
            w="100%"
            justifyContent="center"
            alignContent="center"
            textAlign="center"
            spacing={0}
          >
            <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }}>
              {"Lucid Creations Media"}
            </Heading>
            <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }}>
              {"Code Name:"}
            </Heading>
            <Heading as="h3" fontSize={{ base: "2xl", md: "4xl" }}>
              {"Potty Chart"}
            </Heading>
          </VStack>
        </VStack>
        {error && (
          <Box
            bg="brand.danger"
            color="black"
            borderRadius="lg"
            py={2}
            px={8}
            textAlign="center"
          >
            <Text fontSize="xl">
              {Array.isArray(error) ? errorType(error[0]) : errorType(error)}
            </Text>
          </Box>
        )}
        {Object.values(providers).map((provider) => {
          const { id, name } = provider;
          return name !== "Email" ? (
            <SignInButton
              key={name.replace(" ", "")}
              provider={name}
              id={id}
              signIn={signIn}
            />
          ) : (
            <Box key={name.replace(" ", "")} h="100%" w="100%">
              <EmailForm id={id} provider={name} signIn={signIn} />
            </Box>
          );
        })}
      </VStack>
    </VStack>
  );
};

SignInPage.getInitialProps = async ({ req, res }) => {
  const session = await getSession({ req });

  if (session && res) {
    res.writeHead(302, {
      Location: "/"
    });
    res.end();
    return;
  }

  return {
    session: undefined,
    providers: await getProviders()
  };
};

export default SignInPage;
