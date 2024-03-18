import { gql } from "@apollo/client";
import { addDays } from "date-fns";
import cuid from "cuid";
import apolloClient from "../../../apollo";

const regenerateActivationToken = (userId: string): void => {
  const UPDATE_REGENERATEACTIVATIONTOKEN = gql`
    mutation RegenerateActivationToken(
      $userId: String!
      $expires: Date!
      $newToken: String!
    ) {
      regenerateActivationToken(
        userId: $userId
        expires: $expires
        newToken: $newToken
      ) {
        id
        userId
        token
        validated
        validatedAt
        createdAt
        updatedAt
        expires
      }
    }
  `;

  apolloClient.mutate({
    mutation: UPDATE_REGENERATEACTIVATIONTOKEN,
    variables: {
      userId: userId,
      expires: addDays(new Date(), 1),
      newToken: cuid()
    }
  });
};

export default regenerateActivationToken;
