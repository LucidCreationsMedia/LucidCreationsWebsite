import React from "react";
import { Button } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import regenerateActivationToken from "../../../../lib/api/mutation/activation/regenerateActivationToken";

interface RegenActivationTokenButtonProps {
  userId: string;
}

// TODO: Give user feedback when the new token is generated and take them to the welcome page.

/**
 * @param {string} userId the id of the user that needs their activation token regenerated.
 * @returns reusable button to regenerate the account activation token of a user. Used in the
 * activation and welcome components.
 */

const RegenActivationTokenButton = ({
  userId
}: RegenActivationTokenButtonProps): JSX.Element => {
  return (
    <Button
      leftIcon={<Icon icon="ph:arrows-clockwise-fill" />}
      w="fit-content"
      variant="signIn"
      onClick={() => regenerateActivationToken(userId)}
      type="button"
    >
      {`Regenerate Activation Token`}
    </Button>
  );
};

export default RegenActivationTokenButton;
