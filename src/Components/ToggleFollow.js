import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FOLLOW, UNFOLLOW } from "../Routes/Profile/ProfileHeader";

const GET_USER = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      amIFollowing
    }
  }
`;
const FollowButton = styled.button`
  background-color: ${(props) =>
    props.amIFollowing ? props.theme.grayColor : props.theme.blueColor};
  color: ${(props) => (props.amIFollowing ? "black" : "white")};
  padding: 7px 4px;
  border-radius: 5px;
  display: flex;
  margin-left: auto;
  border: 0;
  font-size: 9px;
  text-transform: uppercase
    ${(props) =>
      props.loading === "true"
        ? `  opacity: .5;
`
        : null};
  :focus {
    outline: none;
  }
`;
function ToggleFollow({ username }) {
  const { data, refetch } = useQuery(GET_USER, { variables: { username } });
  const [amIFollowing, setAmIFollowing] = useState(
    data?.seeProfile?.amIFollowing
  );
  const [follow] = useMutation(FOLLOW, {
    variables: { username },
  });
  const [unfollow] = useMutation(UNFOLLOW, {
    variables: { username },
  });
  const toggleFollow = async () => {
    if (amIFollowing) {
      await unfollow();
      setAmIFollowing(false);
    } else {
      await follow();
      setAmIFollowing(true);
    }
  };
  useEffect(() => {
    setAmIFollowing(data?.seeProfile?.amIFollowing);
  }, [data]);
  return (
    <FollowButton onClick={toggleFollow} amIFollowing={amIFollowing}>
      {amIFollowing ? "unfollow" : "follow"}
    </FollowButton>
  );
}

export default ToggleFollow;
