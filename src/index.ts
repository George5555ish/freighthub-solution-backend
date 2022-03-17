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
import { verifyJwt } from "./utils/jwt";
import { User } from "./schema/user.schema";
import Context from "./types/context";

async function bootstrapServer() {
  const schema = await buildSchema({
    resolvers,
    // authChecker,
  });

  const app = express();

  app.use(cookieParser());

  const server = new ApolloServer({
    schema,
    context: (ctx: Context) => {

        const context = ctx;
        if (ctx.req.cookies.accessToken){
            const user = verifyJwt<User>(ctx.req.cookies.accessToken)

            context.user = user;
        }

        return context;
    },
    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault()
        : ApolloServerPluginLandingPageGraphQLPlayground,
    ],
  });

  await server.start();

  server.applyMiddleware({app});

  app.listen({port: 4000}, () => {
      console.log('App is listening on http://localhost:4000')
  });
  connectToDatabase()
}

bootstrapServer()