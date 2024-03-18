import { gql } from "@apollo/client";
import apolloClient from "../../../apollo";

interface EditUserProfileProps {
  userId: string;
  name: string;
  username: string;
  bio: string;
}

const editUserProfile = (newUserInfo: EditUserProfileProps) => {
  const UPDATE_ACCOUNTINFO = gql`
    mutation UpdateAccountInfo(
      $userId: String!
      $name: String!
      $username: String!
      $bio: String!
    ) {
      updateAccountInfo(
        userId: $userId
        name: $name
        username: $username
        bio: $bio
      ) {
        id
        name
        username
        bio
        role
        email
        createdAt
        updatedAt
      }
    }
  `;

  return apolloClient.mutate({
    mutation: UPDATE_ACCOUNTINFO,
    variables: newUserInfo
  });
};

export default editUserProfile;
export type { EditUserProfileProps };
