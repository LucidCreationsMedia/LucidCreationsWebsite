import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Box } from "@chakra-ui/react";
import Title from "../../../components/title";
import fetchActivationStatus from "../../../../lib/api/query/activation/fetchActivationStatus";
import activateAccount from "../../../../lib/api/mutation/activation/activateAccount";
import DisplayMessage from "../../../components/auth/DisplayMessage";
import tokenReadyToActivate from "../../../../lib/account/activation/tokenReadyToActivate";

interface Errors {
  error: boolean;
  errorMessage: string;
  validated: boolean;
  needRegenerate: boolean;
}

// TODO: Check if the account is activated. Take them to the welcome page if it is. Add the resend activation token button. Align the buttons properly.

/**
 * This is a fallback activation component for user to manually input their activation token
 * from their email address. This component will also allow users regenerate their activation token
 * if it expired or became invalid.
 */

const ActivateAccount = (): JSX.Element => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [errors, setErrors] = useState<Errors>({} as Errors);

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/auth/signin");
    }
  }, [router, session, status]);

  const handleManualActivation = (activationToken: string): void => {
    // Add the slice functions in here.
    if (session) {
      fetchActivationStatus
        .withToken(activationToken)
        .then((res) => {
          const token = res.data.getVerificationWithToken;
          console.info(token);
          const tokenReady = tokenReadyToActivate(
            session.user.id,
            token,
            activationToken
          );

          if (tokenReady.ready && !tokenReady.error.error) {
            console.info("Activating");
            activateAccount(activationToken);
            router.push("/auth/welcome");
          }

          if (tokenReady.error.error && tokenReady.error.validated) {
            router.push("/auth/welcome");
          }

          setErrors(tokenReady.error);
        })
        .catch((err) => {
          setErrors({
            error: true,
            errorMessage:
              "An error occurred when fetching your activation status. Please try again. Contact support if this issue persists.",
            validated: false,
            needRegenerate: false
          });
          console.error(err);
        });
    }
  };

  // const handleResendActivationTokenEmail = (): void => {
  //   // Fetch the user's activation token.
  //   // Check that it is valid.
  //   // If valid then resend the email.
  //   // If invalid show an error, disable the resend key button, and show the regenerate key button.
  //   return;
  // };

  return session ? (
    errors.error ? (
      <Box>
        <Title title="Error" />
        <DisplayMessage
          message={errors.errorMessage}
          error
          regenButton
          userId={session.user.id}
        />
      </Box>
    ) : (
      <Box>
        <Title title="Enter Activation Token" />
        <DisplayMessage
          message="Please enter your activation token"
          manActivation
          regenButton={true}
          genButton={true}
          activate={handleManualActivation}
          userId={session.user.id}
        />
      </Box>
    )
  ) : (
    <Box>
      <Title title="Redirecting..." />
      <DisplayMessage
        message="You must be signed in to activate your account. Redirecting you to the signin page..."
        error
      />
    </Box>
  );
};

export default ActivateAccount;
