import { gql } from "@apollo/client";
export const ME = gql`
  query me {
    me {
      username
      fullname
      posts {
        id
      }
      avatar
    }
  }
`;
export const MYAVATAR = gql`
  query me {
    me {
      avatar
    }
  }
`;
export const LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;
export const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text)
  }
`;
export const SAVE_POST = gql`
  mutation savePost($postId: String!) {
    savePost(postId: $postId)
  }
`;
