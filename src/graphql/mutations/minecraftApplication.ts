import { gql } from "@apollo/client/core";

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

export const SUBMIT_EXISTING_USER_APPLICATION = gql`
  mutation SubmitExistingUserApplication($input: ExistingUserMinecraftApplication!) {
    submitExistingUserApplication(input: $input) {
      id
      discordId
      roleId
      reason
      status
    }
  }
`;

export const DELETE_APPLICATION = gql`
  mutation DeleteMinecraftApplication($id: ID!) {
    deleteMinecraftApplication(id: $id) {
      id
    }
  }
`;
