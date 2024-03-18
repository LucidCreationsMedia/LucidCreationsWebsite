import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppSelector } from "../../redux/hooks";
import { useRouter } from "next/router";
import { Box, VStack } from "@chakra-ui/react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import DisplayMessage from "../../components/auth/DisplayMessage";
import Title from "../../components/title";
import { User } from "next-auth";

const UserProfile = (): JSX.Element => {
  const router = useRouter();

  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/auth/signin");
    }
  }, [router, session, status]);

  const reduxProfile: User = useAppSelector((state) => state.profile);

  /**
   * This component is the first iteration of a setting component.
   * It will allow users to view and edit their profile. The edit portion
   * will be offloaded to a separate component in the settings component.
   */

  return status === "loading" ? (
    <Box>
      <Title title="Loading" />
      <ProfileHeader loading={true} />
    </Box>
  ) : session ? (
    <VStack
      my="10vh"
      w="100%"
      h="auto"
      justifyContent="center"
      alignContent="center"
      spacing={4}
    >
      <Title title="User Profile" />
      <ProfileHeader
        name={reduxProfile.name}
        username={reduxProfile.username}
        bio={reduxProfile.bio}
        loading={false}
      />
    </VStack>
  ) : (
    <Box>
      <Title title="Redirecting..." />
      <DisplayMessage
        message="You must be logged in to view your profile. Redirecting to the signin page..."
        error
      />
    </Box>
  );
};

export default UserProfile;
