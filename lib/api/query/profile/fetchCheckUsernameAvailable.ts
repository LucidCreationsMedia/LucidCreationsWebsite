import { gql } from "@apollo/client";
import apolloClient from "../../../apollo";

const FETCH_CHECKAVAILIBLEUSERNAME = gql`
  query checkUsernameAvailable($username: String!) {
    checkUsernameAvailable(username: $username) {
      username
    }
  }
`;

const fetchCheckAvailableUsername = async (username: string) =>
  await apolloClient.query({
    query: FETCH_CHECKAVAILIBLEUSERNAME,
    variables: {
      username: username
    }
  });

export default fetchCheckAvailableUsername;
