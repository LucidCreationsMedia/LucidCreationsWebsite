import { gql } from "@apollo/client";
import { GraphQLScalarType } from "graphql";

const DateTime = new GraphQLScalarType({
  name: "Date",
  description: "Date scalar",
  parseValue(value: string) {
    return new Date(value);
  },
  serialize(value: Date) {
    return value.toJSON();
  }
});

const typeDefs = gql`
  scalar Date
  type Account {
    id: ID!
    userId: String!
    type: String!
    provider: String!
    providerAccountId: String!
    refresh_token: String
    access_token: String
    expires_at: Int
    token_type: String
    scope: String
    id_token: String
    session_state: String
    oauth_token_secret: String
    oauth_token: String
    createdAt: Date!
    updatedAt: Date!
    user: User!
  }

  type Session {
    id: ID!
    sessionToken: String!
    userId: String!
    expires: Date!
    createdAt: Date!
    updatedAt: Date!
    user: User!
  }

  enum Role {
    ADMIN
    USER
  }

  type User {
    id: ID!
    name: String
    username: String
    bio: String
    role: Role!
    email: String
    emailVerified: Date
    image: String
    createdAt: Date!
    updatedAt: Date!
    ActivationToken: ActivationToken!
    accounts: [Account]!
    sessions: [Session]!
    # Calender: [Calender]
  }

  type VerificationToken {
    identifier: String
    token: String
    createdAt: Date!
    updatedAt: Date!
    expires: Date!
  }

  type ActivationToken {
    id: String!
    userId: String!
    token: String!
    validated: Boolean!
    validatedAt: Date
    createdAt: Date
    updatedAt: Date!
    expires: Date!
    User: User!
  }

  # type Calender {
  #   id: String!
  #   userId: String!
  #   name: String!
  #   type: String!
  #   theme: String!
  #   calendarData: JSON!
  #   createdAt: Date!
  #   updatedAt: Date!
  # }

  type Query {
    users: [User]
    getVerificationWithToken(activationToken: String!): ActivationToken
    getVerificationWithUserId(userId: String!): ActivationToken
    checkUsernameAvailable(username: String!): User
  }

  type Mutation {
    genVerificationToken(userId: String!, expires: Date!): ActivationToken!
    regenerateActivationToken(
      userId: String!
      expires: Date!
      newToken: String!
    ): ActivationToken!
    activateAccount(activationToken: String!): ActivationToken!
    updateAccountInfo(
      userId: String!
      name: String!
      username: String!
      bio: String!
    ): User!
  }
`;

export default typeDefs;
export { DateTime };
