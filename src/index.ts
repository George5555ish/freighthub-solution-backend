import dotenv from "dotenv";
dotenv.config();
import "reflect-metadata";
import express from "express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core/dist/plugin/landingPage/graphqlPlayground";
import { ApolloServerPluginLandingPageProductionDefault } from "apollo-server-core";
import { resolvers } from "./resolvers";
import { connectToDatabase } from "./db/mongodb";
import Context from "./types/context";

// const port = process.env.PORT || 5000;
async function bootstrapServer() {
  const schema = await buildSchema({
    resolvers,
    // authChecker,
  });

  const app = express();

  app.use(cookieParser());

  const server = new ApolloServer({
    schema,
    context: (ctx: Context) => ctx,
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground,
    ],
  });

  await server.start();

  server.applyMiddleware({app});
  connectToDatabase(app)

}

bootstrapServer()