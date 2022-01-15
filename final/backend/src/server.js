import { GraphQLServer, PubSub } from "graphql-yoga";

// resolvers
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription"
// db
import userDatabase from "./models/user";
import cookieDatabase from "./models/cookie";
import recordDatabase from "./models/record";
import strategyDatabase from "./models/strategy";

const pubSub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription
  },
  context: {
    userDatabase,
    cookieDatabase,
    recordDatabase,
    strategyDatabase,
    pubSub,
  },
});

export default server;
