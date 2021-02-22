import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader";
import PostContainer from "./PostContainer";
const GET_POST = gql`
  query seePost($postId: String!) {
    seePost(postId: $postId) {
      id
      user {
        avatar
        amIFollowing
        username
        isSelf
      }
      isLiked
      isSaved
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
function Post({ id }) {
  const { postId } = useParams();
  let pId;
  if (postId) {
    pId = postId;
  } else {
    pId = id;
  }
  const { data, loading } = useQuery(GET_POST, {
    variables: { postId: pId },
    fetchPolicy: "no-cache",
  });
  if (loading || !data) {
    return <Loader />;
  } else {
    const { seePost: post } = data;
    return (
      <PostContainer
        id={post.id}
        user={post.user}
        isLiked={post.isLiked}
        isSaved={post.isSaved}
        photos={post.photos}
        createdAt={post.createdAt}
        numberOfLikes={post.numberOfLikes}
        caption={post.caption}
      />
    );
  }
}

export default Post;
