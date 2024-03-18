import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useAppSelector } from "../../redux/hooks";
import { Box } from "@chakra-ui/react";
import ModifyAccount from "../../components/profile/ModifyAccount";
import DisplayMessage from "../../components/auth/DisplayMessage";
import Title from "../../components/title";
import { User } from "next-auth";
import fetchActivationStatus from "../../../lib/api/query/activation/fetchActivationStatus";
import validateToken from "../../../lib/account/activation/validateActivationToken";

// TODO: On this page users will see the tutorial, have a chance to edit their info, customize their privacy settings, and add their friends.

const NewUserPage = (): JSX.Element => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [tokenStatus, setTokenStatus] = useState<{
    status: boolean | null;
    message: string;
  }>({
    status: false,
    message: ""
  });

  const reduxProfile: User = useAppSelector((state) => state.profile);

  useEffect(() => {
    if (session && status === "authenticated") {
      if (session.user) {
        const { id } = session.user;
        fetchActivationStatus
          .withUserId(id)
          .then((res) => {
            setTokenStatus(
              validateToken({
                ...res.data.getVerificationWithUserId,
                sessionUserId: id
              })
            );
          })
          .catch((err) => {
            console.error(err);
            setTokenStatus({
              status: null,
              message: ""
            });
          });
      }
    }

    if (!session && status !== "loading") {
      router.push("/auth/signin");
    }
  }, [router, session, status]);

  /**
   * This is used to walk the user through setting up their account.
   * Including setting their profile picture, username, and general settings.
   * At a later date they will be able to search for friends to follow or add within this component.
   */

  return session && status !== "loading" ? (
    tokenStatus.status === null ? (
      <Box>
        <Title title="Not Activated" />
        <DisplayMessage
          message="Your account doesn't have an activation token. Please re-generate one. Contact support if this issue persists."
          userId={session.user.id}
          genButton
          error
          toActivationPage
        />
      </Box>
    ) : tokenStatus.status ? (
      <Box>
        <Title title="Modify Your Account" />
        <ModifyAccount
          userId={reduxProfile.id}
          name={reduxProfile.name}
          username={reduxProfile.username}
          bio={reduxProfile.bio}
        />
      </Box>
    ) : (
      <Box>
        <Title title="Error" />
        <DisplayMessage
          message={tokenStatus.message}
          error
          toActivationPage={
            tokenStatus.message.split("Account not activated").length ||
            tokenStatus.message.split("Your activation status is not valid")
              .length > 1
              ? true
              : false
          }
        />
      </Box>
    )
  ) : !session && status !== "loading" ? (
    <Box>
      <Title title="Redirecting..." />
      <DisplayMessage
        message="Please register to see the welcome page! Redirecting to signin page..."
        error
      />
    </Box>
  ) : (
    <Box>
      <Title title="Loading" />
      <DisplayMessage message="Fetching your account details..." loading />
    </Box>
  );
};

export default NewUserPage;
