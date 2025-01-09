import { gql } from "@apollo/client/core";

export const CREATE_USER = gql`
  mutation CreateFarwaterUser($input: NewFarwaterUser!) {
    createFarwaterUser(input: $input) {
      id
      discordId
      minecraftName
      minecraftUuid
      dateOfBirth
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateFarwaterUser($input: UpdateFarwaterUser!) {
    updateFarwaterUser(input: $input) {
      id
      discordId
      minecraftName
      minecraftUuid
      dateOfBirth
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteFarwaterUser($id: ID!) {
    deleteFarwaterUser(id: $id) {
      id
    }
  }
`;
