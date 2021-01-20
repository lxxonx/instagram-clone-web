import { gql } from "@apollo/client";

export const LOG_IN = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;

export const SIGN_UP = gql`
  mutation createUser(
    $username: String!
    $email: String!
    $firstname: String
    $lastname: String
  ) {
    createUser(
      username: $username
      email: $email
      firstname: $firstname
      lastname: $lastname
    ) {
      id
    }
  }
`;
