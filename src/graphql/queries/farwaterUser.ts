import { gql } from "@apollo/client/core";

export const GET_USER = gql`
  query GetUser($filter: FarwaterUserFilter!) {
    farwaterUser(filter: $filter) {
      id
      discordId
      minecraftUuid
      minecraftName
      minecraftSkinSum
      dateOfBirth
      createdAt
      updatedAt
      minecraftApplications {
        id
        status
        createdAt
      }
    }
  }
`;
