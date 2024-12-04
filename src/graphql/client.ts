import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client/core";
import fetch from "cross-fetch";
import "dotenv/config";

if (!process.env.API_URL) {
  throw new Error("API_URL environment variable is not set");
}

if (!process.env.API_SECRET) {
  throw new Error("API_SECRET environment variable is not set");
}

const httpLink = createHttpLink({
  uri: `${process.env.API_URL}/graphql`,
  fetch,
  headers: {
    Authorization: `Bearer ${process.env.API_SECRET}`,
  },
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
