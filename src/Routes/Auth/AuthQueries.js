import { gql } from "@apollo/client";

export const WRITE_TOKEN = gql`
  mutation logUserIn($token: String!) {
    logUserIn(token: $token) @client
  }
`;
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
export const FORGOT_PWD = gql`
  mutation requestSecret($email: String!) {
    requestSecret(email: $email)
  }
`;
export const CONFIRM_SECRET = gql`
  mutation confirmSecret($email: String!, $secret: String!) {
    confirmSecret(email: $email, secret: $secret) {
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
