import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// resolvers
import { resolvers } from "@/graphql/resolvers";

// types
import { typeDefs } from "@/graphql/schema";

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Server ready at url:${url}`);
