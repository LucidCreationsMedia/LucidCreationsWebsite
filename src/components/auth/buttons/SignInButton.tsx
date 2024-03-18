import React from "react";
import { signIn } from "next-auth/react";
import { Button } from "@chakra-ui/react";
import { Icon } from "@iconify/react";

interface SignInButtonProps {
  provider: string;
  id: string;
  signIn?: typeof signIn;
  validForm?: boolean;
  isSubmitting?: boolean;
}

const logos = {
  Google: <Icon icon="logos:google-icon" />,
  Twitter: <Icon icon="logos:twitter" />,
  Email: <Icon icon="ic:round-email" />
};

/**
 * @param {string} provider the name of the signin provider (Google, GitHub, Twitter, Discord, etc).
 * @param {string} id the id of the provider from Next-Auth.
 * @param {typeof signIn} sigin the signin function from Next-Auth.
 * @param {boolean} validForm used for the email signin. Signifies if the form data is valid.
 * @param {boolean} isSubmitting used for the email signin. Signifies if the form data is submitting.
 * @returns reusable signin buttons for the auth component.
 */

const SignInButton = ({
  provider,
  id,
  signIn,
  validForm,
  isSubmitting
}: SignInButtonProps): JSX.Element => {
  return provider === "Email" ? (
    <Button
      type="submit"
      leftIcon={logos[provider.split(" ")[0]]}
      w="fit-content"
      variant="submit"
      isDisabled={!validForm}
      background={validForm ? "brand.valid" : "brand.danger"}
      isLoading={isSubmitting}
    >
      {`Sign in with ${provider.split(" ")[0]}`}
    </Button>
  ) : (
    <Button
      leftIcon={logos[provider.split(" ")[0]]}
      w="100%"
      variant="signIn"
      onClick={() => signIn(id)}
      type="button"
    >
      {`Sign in with ${provider.split(" ")[0]}`}
    </Button>
  );
};

export default SignInButton;
