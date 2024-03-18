import React from "react";
import { signOut } from "next-auth/react";
import { Button } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

/**
 * @returns Reusable signout button for the auth component.
 * Invokes the Next-Auth signout function on click to
 * clear the session and remove it from the database.
 */

const SignOutButton = (): JSX.Element => {
  return (
    <Button
      leftIcon={<Icon icon="ph:sign-out-fill" />}
      w="fit-content"
      variant="signIn"
      onClick={() => signOut()}
      type="button"
    >
      {`Signout`}
    </Button>
  );
};

export default SignOutButton;
