import { gql } from "@apollo/client";
import { addDays } from "date-fns";
import apolloClient from "../../../apollo";

const genActivationToken = (userId: string): void => {
  const CREATE_GENVERIFICATIONTOKEN = gql`
    mutation Mutation($userId: String!, $expires: Date!) {
      genVerificationToken(userId: $userId, expires: $expires) {
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
    mutation: CREATE_GENVERIFICATIONTOKEN,
    variables: {
      userId: userId,
      expires: addDays(new Date(), 1)
    }
  });
};

export default genActivationToken;
