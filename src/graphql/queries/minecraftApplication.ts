import { gql } from "@apollo/client/core";

export const GET_ALL_APPLICATIONS = gql`
  query GetAllApplications {
    minecraftApplications {
      id
      discordId
      roleId
      reason
      status
      createdAt
    }
  }
`;

export const GET_APPLICATION = gql`
  query GetApplication($id: ID!) {
    minecraftApplication(id: $id) {
      id
      discordId
      roleId
      reason
      status
      createdAt
      farwaterUser {
        id
        minecraftName
        minecraftUuid
      }
    }
  }
`;
