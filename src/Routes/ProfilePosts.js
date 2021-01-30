import { gql, useQuery } from "@apollo/client";
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const POST = gql`
  query seePost($postId: String!) {
    seePost(postId: $postId) {
      id
      photos {
        url
      }
      numberOfLikes
    }
  }
`;
const Post = styled.img`
  max-height: 293px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  object-fit: cover;
`;
function ProfilePosts({ postId }) {
  const { data, loading } = useQuery(POST, { variables: { postId } });
  return !loading && data && data.seePost ? (
    <Post src={data.seePost.photos[0].url}></Post>
  ) : null;
}
ProfilePosts.propTypes = {
  postId: PropTypes.string.isRequired,
};
export default ProfilePosts;
