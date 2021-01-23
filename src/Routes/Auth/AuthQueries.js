import { gql } from "@apollo/client";

export const LOG_IN = gql`
  mutation login($emailOrUsername: String!, $password: String!) {
    login(emailOrUsername: $emailOrUsername, password: $password) {
      token
      error {
        message
        location
      }
      user {
        username
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation createUser(
    $emailOrPhone: String!
    $username: String!
    $password: String!
    $firstname: String
  ) {
    createUser(
      username: $username
      emailOrPhone: $emailOrPhone
      password: $password
      firstname: $firstname
    ) {
      id
    }
  }
`;
