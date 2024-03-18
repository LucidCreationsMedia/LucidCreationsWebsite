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

/**
 * This component is for users to automatically activate their account
 * when following the activation link sent to their email address.
 */

const ActivateAccount = (): JSX.Element => {
  const router = useRouter();
  const { activationToken } = router.query;

  const { data: session, status } = useSession();

  const [errors, setErrors] = useState<Errors>({} as Errors);

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/auth/signin");
    }

    // TODO: Replace this with redux slices.
    if (activationToken && !Array.isArray(activationToken) && session) {
      fetchActivationStatus
        .withToken(activationToken)
        .then((res) => {
          const token = res.data.getVerificationWithToken;
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
  }, [activationToken, router, session, status]);

  return session ? (
    errors.error ? (
      errors.needRegenerate ? (
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
          <Title title="Error" />
          <DisplayMessage message={errors.errorMessage} error />
        </Box>
      )
    ) : (
      <Box>
        <Title title="Activating Account..." />
        <DisplayMessage message="Activating your account" loading />
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
