import { gql, useSubscription } from "@apollo/client";
import React from "react";
import PropTypes from "prop-types";

const LIKED = gql`
  subscription notification($username: String!) {
    notification(username: $username) {
      user {
        username
      }
    }
  }
`;
function FeedActions({ username }) {
  const { data, loading } = useSubscription(LIKED, {
    variables: { username },
  });
  if (loading) {
    return null;
  } else {
    console.log(data);
    return <div>{data}</div>;
  }
}
FeedActions.propTypes = {
  username: PropTypes.string.isRequired,
};

export default FeedActions;
