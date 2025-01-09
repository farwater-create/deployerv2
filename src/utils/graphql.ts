import { ApolloClient, InMemoryCache, gql, createHttpLink } from "@apollo/client/core";
import fetch from "cross-fetch";
import "dotenv/config";

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

export const SUBMIT_NEW_USER_APPLICATION = gql`
  mutation SubmitNewUserApplication($input: NewMinecraftApplication!) {
    submitNewUserApplication(input: $input) {
      id
      discordId
      roleId
      reason
      status
    }
  }
`;
