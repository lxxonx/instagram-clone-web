import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Components/Avatar";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import useMeQuery from "../Hooks/useMeQuery";
import ProfilePosts from "./ProfilePosts";

const PROFILE = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      username
      avatar
      posts {
        id
      }
    }
  }
`;
const POSTS = gql`
  query getProfilePost($username: String!, $limit: Int!, $offset: Int!) {
    getProfilePost(username: $username, limit: $limit, offset: $offset) {
      id
    }
  }
`;

const Wrapper = styled.div`
  padding: 30px 0 20px;
`;
const UserInfo = styled.header`
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  flex-direction: row;
  margin-bottom: 50px;
`;
const AvatarWrapper = styled.div`
  max-width: 293px;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Posts = styled.article`
  display: flex;
  justify-content: space-between;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
`;
const PostWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 293px);
  grid-template-rows: 293px;
  grid-auto-rows: 293px;
  grid-gap: 28px;
  img {
    max-width: 293px;
  }
`;
const Nav = styled.div`
  border-top: ${(props) => props.theme.boxBorder};
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
  height: 53px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
`;
const ProfileLink = styled(Link)`
  box-sizing: border-box;
  height: 100%;
  color: black;
  align-items: center;
  justify-content: center;
  display: flex;
  &:not(:last-child) {
    margin-right: 60px;
  }
  &:active {
    opacity: 0.3;
  }
  ${(props) => {
    return props.selected
      ? "border-top: 1px solid black; font-weight: 600;"
      : null;
  }}
`;
function Profile() {
  const { username } = useParams();
  const { data: meData } = useMeQuery();
  const { pathname } = useLocation();
  const { data, loading } = useQuery(PROFILE, { variables: { username } });
  const [limit, setLimit] = useState(21);
  const { data: postData, loading: postLoading, fetchMore } = useQuery(POSTS, {
    variables: { username, limit, offset: 0 },
  });
  const [location, setLocation] = useState(`home`);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    switch (pathname) {
      case `/${username}/tagged`:
        setLocation("tagged");
        break;
      case `/${username}/channel`:
        setLocation("channel");
        break;
      case `/${username}/saved`:
        setLocation("saved");
        break;
      default:
        setLocation("home");
        break;
    }
    return () => {};
  });
  return loading ||
    !data ||
    !data.seeProfile ||
    postLoading ||
    !postData ||
    !postData.getProfilePost ? (
    <Loader />
  ) : (
    <>
      <Wrapper>
        {
          <>
            <UserInfo>
              <AvatarWrapper>
                <Avatar src={data.seeProfile.avatar} size={150} />
              </AvatarWrapper>
              {data.seeProfile.username}
              {data.seeProfile.fullname}
              {data.seeProfile.bio}
            </UserInfo>
            <Nav>
              <ProfileLink
                to={`/${data.seeProfile.username}`}
                onClick={() => setLocation(`home`)}
                selected={location === "home"}
              >
                게시물
              </ProfileLink>
              <ProfileLink
                to={`/${data.seeProfile.username}/channel`}
                onClick={() => setLocation(`channel`)}
                selected={location === "channel"}
              >
                IGTV
              </ProfileLink>
              {meData.me.username === username && (
                <ProfileLink
                  to={`/${data.seeProfile.username}/saved`}
                  onClick={() => setLocation(`saved`)}
                  selected={location === "saved"}
                >
                  Saved
                </ProfileLink>
              )}
              <ProfileLink
                to={`/${data.seeProfile.username}/tagged`}
                onClick={() => setLocation(`tagged`)}
                selected={location === "tagged"}
              >
                Tagged
              </ProfileLink>
            </Nav>

            <Posts>
              <PostWrapper
              // onLoad={() => {
              //   const currentLength = postData.getProfilePost.length;
              //   fetchMore({
              //     variables: {
              //       offset: currentLength,
              //       limit: 3,
              //     },
              //   }).then(({ data }) => {
              //     // Update variables.limit for the original query to include
              //     // the newly added feed items.
              //     if (data.getProfilePost.length < limit) {
              //       setHasMore(false);
              //     }
              //     setLimit(currentLength + postData.getProfilePost.length);
              //     console.log(postData.getProfilePost);
              //   });
              // }}
              >
                {location === "home" &&
                  postData.getProfilePost.map((post, index) => {
                    return <ProfilePosts postId={post.id} key={index} />;
                  })}
                {location === "channel" && <div>channel</div>}
                {location === "saved" && <div>saved</div>}
                {location === "tagged" && <div>tagged</div>}
              </PostWrapper>
            </Posts>
            {/* todo infinite scroll */}
          </>
        }
      </Wrapper>
      <Footer />
    </>
  );
}

export default Profile;
