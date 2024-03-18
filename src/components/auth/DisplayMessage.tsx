import {
  Divider,
  Heading,
  HStack,
  Image,
  Text,
  VStack
} from "@chakra-ui/react";
import React from "react";
import CustomButton from "../buttons/Custom";
import LoadingSpinner from "../loading/LoadingSpinner";
import GenActivationTokenButton from "./buttons/GenerateActivationToken";
import RegenActivationTokenButton from "./buttons/RegenActivationTokenButton";
import ManualAccountActivationForm from "./ManualAccActivationForm";

interface DisplayMessageProps {
  message: string;
  loading?: boolean;
  error?: boolean;
  regenButton?: boolean;
  genButton?: boolean;
  userId?: string;
  manActivation?: boolean;
  activate?: (activationToken: string) => void;
  toActivationPage?: boolean;
}

/**
 * Displays a message during the account activation.
 * @param {string} message the message to be displayed.
 * @param {boolean} loading display a spinner next to the text being displayed.
 * @param {boolean} error displays the message in a red text.
 * @param {boolean} regenButton displays the regenerate the account activation token button.
 * @param {boolean} genButton displays the generate the account activation token button.
 * @param {string} userId the user id for which to (re)generate the activation token.
 * @param {boolean} manActivation displays the manual account activation form.
 * @param activate the function to be called when the manual activation from is submitted.
 * @param {boolean} toActivationPage displays a button that takes the user to the activation page.
 * @returns a reusable message box with other components to display errors with the login and welcome component.
 */

const DisplayMessage = ({
  message,
  loading,
  error,
  regenButton,
  genButton,
  userId,
  manActivation,
  activate,
  toActivationPage
}: DisplayMessageProps): JSX.Element => {
  return (
    <VStack
      h="100%"
      w="100%"
      my="30vh"
      justifyContent="center"
      alignContent="center"
    >
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
        spacing={4}
      >
        <VStack
          h="100%"
          w="100%"
          mb="3vh"
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
          <Divider />
          <HStack
            h="auto%"
            w="100%"
            justifyContent="center"
            alignContent="center"
            spacing={6}
          >
            {loading && <LoadingSpinner />}
            <Text
              fontSize="2xl"
              color={error ? "brand.danger" : "whiteAlpha.900"}
            >
              {message}
            </Text>
          </HStack>
          {manActivation && <ManualAccountActivationForm activate={activate} />}
          {regenButton && <RegenActivationTokenButton userId={userId} />}
          {genButton && <GenActivationTokenButton userId={userId} />}
          {toActivationPage && (
            <CustomButton
              text="To Activation Page"
              link="/auth/activate"
              type="primary"
              newTab={false}
            />
          )}
        </VStack>
      </VStack>
    </VStack>
  );
};

export default DisplayMessage;
