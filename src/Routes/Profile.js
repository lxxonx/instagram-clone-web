import { gql } from "apollo-boost";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import { useParams } from "react-router-dom";

const PROFILE = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      username
      posts {
        photos
      }
    }
  }
`;

function Profile() {
  const { username } = useParams();
  const profile = useQuery(PROFILE);
  console.log(profile);
  console.log(username);
  return <div>{username}</div>;
}

export default Profile;
