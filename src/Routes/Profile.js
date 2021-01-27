import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Components/Avatar";
import Loader from "../Components/Loader";

const PROFILE = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      username
      avatar
      posts {
        photos {
          url
        }
      }
    }
  }
`;
const Wrapper = styled.div`
  padding: 30px 20px 0;
`;
const UserInfo = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const AvatarWrapper = styled.div`
  max-width: 293px;
  width: 100%;
`;
function Profile() {
  const { username } = useParams();
  const { data, loading } = useQuery(PROFILE, { variables: { username } });

  return (
    <Wrapper>
      {loading || !data || !data.seeProfile ? (
        <Loader />
      ) : (
        <UserInfo>
          <Avatar src={data.seeProfile.avatar} size={150} radius={75} />
          {data.seeProfile.username}
          {data.seeProfile.fullname}
          {data.seeProfile.bio}
        </UserInfo>
      )}
    </Wrapper>
  );
}

export default Profile;
