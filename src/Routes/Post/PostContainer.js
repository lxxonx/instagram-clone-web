import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader";
const POST = gql`
  query seePost($postId: String!) {
    seePost(postId: $postId) {
      id
      user {
        avatar
        amIFollowing
        username
      }
      isLiked
      comments {
        createdAt
        id
        text
        user {
          username
        }
      }
      photos {
        id
        url
        tagged {
          user {
            username
          }
        }
      }
      createdAt
      numberOfLikes
      caption
    }
  }
`;
function PostContainer() {
  const { postId } = useParams();
  const { data, loading } = useQuery(POST, { variables: { postId } });
  if (loading) {
    return <Loader />;
  } else {
    const { seePost: post } = data;

    return <div></div>;
  }
}

export default PostContainer;
