import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";
import DisplayMessage from "../../components/auth/DisplayMessage";
import Title from "../../components/title";

const SignOutPage = (): JSX.Element => {
  const router = useRouter();

  // User session and profile
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session && status !== "loading") {
      signOut();
    }

    router.push("/");
  }, [router, session, status]);

  return (
    <Box>
      <Title title="Signing out..." />
      <DisplayMessage message="Signing you out..." loading />
    </Box>
  );
};

export default SignOutPage;
