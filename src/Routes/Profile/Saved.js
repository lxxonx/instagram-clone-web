import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import ProfilePosts from "./ProfilePosts";
import PropTypes from "prop-types";
import { PostWrapper } from "./ProfileStyles";
const SAVES = gql`
  query getSaved($username: String!, $limit: Int!, $offset: Int!) {
    getSaved(username: $username, limit: $limit, offset: $offset) {
      post {
        id
        photos {
          url
        }
        numberOfLikes
        numberOfComments
      }
    }
  }
`;

function Saved({ username }) {
  const { data, loading } = useQuery(SAVES, {
    variables: { username, limit: 21, offset: 0 },
    fetchPolicy: "no-cache",
  });
  if (loading || !data) {
    return null;
  } else {
    const { getSaved } = data;
    return (
      <PostWrapper>
        {getSaved.length > 0
          ? getSaved.map((saved, index) => {
              return (
                <Link to={`/p/${saved.post.id}`} key={index}>
                  <ProfilePosts
                    postId={saved.post.id}
                    key={index}
                    url={saved.post.photos[0].url}
                    numberOfLikes={saved.post.numberOfLikes}
                    numberOfComments={saved.post.numberOfComments}
                  />
                </Link>
              );
            })
          : "you have no saved post"}
      </PostWrapper>
    );
  }
}
Saved.propTypes = {
  username: PropTypes.string.isRequired,
};
export default Saved;
