import { VStack } from "@chakra-ui/react";
import React from "react";
import ProfileHeader from "./ProfileHeader";
import EditAccountForm from "../welcome/EditAccountForm";

interface ModifyAccountProps {
  userId: string;
  name?: string;
  username?: string;
  bio?: string;
}

/**
 * A component that allows the user to update their account info and
 * view the changes before submitting them.
 * @param {string} userId the user id from the session.
 * @param {string} name the user's name from the session.
 * @param {string} username the username id from the session.
 * @param {string} bio the user's bio from the session.
 */

const ModifyAccount = ({
  userId,
  name,
  username,
  bio
}: ModifyAccountProps): JSX.Element => {
  return (
    <VStack
      my="10vh"
      w="100%"
      h="auto"
      justifyContent="center"
      alignContent="center"
      spacing={4}
    >
      <ProfileHeader
        name={name}
        username={username}
        bio={bio}
        loading={false}
      />
      <EditAccountForm
        userId={userId}
        name={name}
        username={username}
        bio={bio}
        loading={false}
      />
    </VStack>
  );
};

export default ModifyAccount;
