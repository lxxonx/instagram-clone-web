import { gql } from "@apollo/client";
export const ME = gql`
  query meData {
    me {
      id
      username
      fullname
      posts {
        id
      }
      avatar
    }
  }
`;

export const MYFOLLWERS = gql`
  query myFollowers {
    me {
      following {
        id
        avatar
        username
      }
    }
  }
`;

export const MYAVATAR = gql`
  query myAvatar {
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
    addComment(postId: $postId, text: $text) {
      text
      createdAt
      user {
        username
        avatar
      }
    }
  }
`;
export const GET_COMMENT = gql`
  query getMoreComments($postId: String!, $limit: Int, $cursor: String) {
    getMoreComments(postId: $postId, limit: $limit, cursor: $cursor) {
      comments {
        text
        createdAt
        user {
          username
          avatar
        }
      }
      hasMore
      cursor
    }
  }
`;
export const SAVE_POST = gql`
  mutation savePost($postId: String!) {
    savePost(postId: $postId)
  }
`;
export const CREATE_CHAT = gql`
  mutation createChat($toId: [String!]) {
    createChat(toId: $toId) {
      id
    }
  }
`;
