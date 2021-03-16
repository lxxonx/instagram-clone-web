import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import ProfilePosts from "./ProfilePosts";
import { PostWrapper } from "./ProfileStyles";
const POSTS = gql`
  query getProfilePost($username: String!, $limit: Int!, $offset: Int!) {
    getProfilePost(username: $username, limit: $limit, offset: $offset) {
      id
      photos {
        url
      }
      numberOfLikes
      numberOfComments
    }
  }
`;
function Posted({ username }) {
  const { data, loading } = useQuery(POSTS, {
    variables: { username, limit: 21, offset: 0 },
    fetchPolicy: "no-cache",
  });
  if (loading || !data) {
    return null;
  } else {
    const { getProfilePost } = data;
    return (
      <PostWrapper>
        {getProfilePost.length > 0
          ? getProfilePost.map((post, index) => {
              return (
                <Link to={`/p/${post.id}`} key={index}>
                  <ProfilePosts
                    postId={post.id}
                    key={index}
                    url={post.photos[0].url}
                    numberOfLikes={post.numberOfLikes}
                    numberOfComments={post.numberOfComments}
                  />
                </Link>
              );
            })
          : "you have no post"}
      </PostWrapper>
    );
  }
}

export default Posted;
