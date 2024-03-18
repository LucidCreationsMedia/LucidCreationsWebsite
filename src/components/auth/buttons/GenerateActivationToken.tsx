import React from "react";
import { Button } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import genActivationToken from "../../../../lib/api/mutation/activation/genActivationToken";

interface RegenActivationTokenButtonProps {
  userId: string;
}

// TODO: Give user feedback when the new token is generated and take them to the welcome page.

/**
 * @param {string} userId the id of the user that needs their activation token generated.
 * @returns reusable button to generate the account activation token of a user. Used in the
 * activation and welcome components.
 */

const GenActivationTokenButton = ({
  userId
}: RegenActivationTokenButtonProps): JSX.Element => {
  return (
    <Button
      leftIcon={<Icon icon="ph:arrows-clockwise-fill" />}
      w="fit-content"
      variant="signIn"
      onClick={() => genActivationToken(userId)}
      type="button"
    >
      {`Generate Activation Token`}
    </Button>
  );
};

export default GenActivationTokenButton;
