import { gql } from "@apollo/client";
import apolloClient from "../../../apollo";

const FETCH_VERIFYTOKENWITHUSERID = gql`
  query GetVerificationWithUserId($userId: String!) {
    getVerificationWithUserId(userId: $userId) {
      id
      userId
      validated
      validatedAt
      expires
    }
  }
`;

const FETCH_VERIFYTOKENWITHTOKEN = gql`
  query GetVerificationWithToken($activationToken: String!) {
    getVerificationWithToken(activationToken: $activationToken) {
      id
      userId
      token
      validated
      validatedAt
      expires
    }
  }
`;

const fetchActivationStatus = {
  withToken: async (activationToken: string) =>
    await apolloClient.query({
      query: FETCH_VERIFYTOKENWITHTOKEN,
      variables: {
        activationToken: activationToken
      }
    }),
  withUserId: async (userId: string) =>
    await apolloClient.query({
      query: FETCH_VERIFYTOKENWITHUSERID,
      variables: {
        userId: userId
      }
    })
};

export default fetchActivationStatus;
