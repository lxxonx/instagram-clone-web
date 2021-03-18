import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader";
import { GET_COMMENT } from "../../Components/SharedQueries";
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
        fullname
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
      location
      createdAt
      numberOfLikes
      caption
      numberOfComments
    }
  }
`;
function Post({ id }) {
  const { postId } = useParams();
  let pId;
  const limit = 5;
  if (postId) {
    pId = postId;
  } else {
    pId = id;
  }
  const { data, loading } = useQuery(GET_POST, {
    variables: { postId: pId },
    fetchPolicy: "no-cache",
  });
  const { data: comment_data, fetchMore: fetchMoreComments } = useQuery(
    GET_COMMENT,
    {
      variables: { postId: pId, limit },
    }
  );
  if (loading || !data || !comment_data) {
    if (postId) return <Loader />;
    else return null;
  } else {
    const { seePost: post } = data;
    const comments = comment_data?.getMoreComments;
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
        location={post.location}
        numberOfComments={post.numberOfComments}
        comments={comments}
        fetchMoreComments={fetchMoreComments}
      />
    );
  }
}

export default Post;
