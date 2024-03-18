import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../../lib/prisma";
import typeDefs, { DateTime } from "../../../../graphql/schema";
import resolvers from "../../../../graphql/resolvers";

export type Context = {
  prisma: PrismaClient;
};

const apolloServer = new ApolloServer<Context>({
  typeDefs,
  resolvers: {
    Date: DateTime,
    ...resolvers
  },
  csrfPrevention: true,
  cache: "bounded"
});

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({
    req,
    res,
    prisma,
    session: getServerSession(req, res, authOptions)
      .then((data) => data)
      .catch((err) => err)
  })
});
