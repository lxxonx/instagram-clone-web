import { gql } from "@apollo/client";
export const ME = gql`
  query me {
    me {
      username
      avatar
      fullname
      posts {
        id
      }
    }
  }
`;
