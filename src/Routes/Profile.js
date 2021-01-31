import { gql, useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Components/Avatar";
import Button from "../Components/Button";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import { ME } from "../Components/SharedQueries";
import ProfilePosts from "./ProfilePosts";

const PROFILE = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      username
      avatar
      fullname
      bio
      posts {
        id
      }
      isSelf
      numberOfFollowers
      numberOfFollowings
      numberOfPosts
      amIFollowing
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
const InfoWrapper = styled.section`
  padding: 8px 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Username = styled.h2`
  font-size: 30px;
`;
const Numbers = styled.ul`
  margin-top: 20px;
  list-style: none;
  display: flex;
  flex-direction: row;
`;
const NumberText = styled.li`
  font-size: 16px;
  strong {
    font-weight: 600;
  }
  &:not(:last-child) {
    margin-right: 30px;
  }
`;
const OtherInfo = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;
const Name = styled.h1`
  font-weight: 600;
  font-size: 18px;
`;
const Bio = styled.span`
  margin-top: 5px;
`;
function Profile() {
  const { username } = useParams();
  const { pathname } = useLocation();
  const { data, loading } = useQuery(PROFILE, { variables: { username } });
  const [limit, setLimit] = useState(21);
  const { data: postData, loading: postLoading } = useQuery(POSTS, {
    variables: { username, limit, offset: 0 },
    fetchPolicy: "no-cache",
  });
  const [location, setLocation] = useState(`home`);
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
  }, [username, pathname]);
  if (loading || postLoading || !data || !postData) {
    return <Loader />;
  } else {
    const { seeProfile } = data;
    const { getProfilePost } = postData;
    return (
      <>
        <Wrapper>
          {
            <>
              <UserInfo>
                <AvatarWrapper>
                  <Avatar src={seeProfile.avatar} size={150} />
                </AvatarWrapper>
                <InfoWrapper>
                  <Username>
                    {seeProfile.username}{" "}
                    {seeProfile.isSelf ? (
                      <Button text={"Edit Profile"} />
                    ) : seeProfile.amIFollowing ? (
                      <Button text={"unfollow"} />
                    ) : (
                      <Button text={"follow"} />
                    )}
                  </Username>
                  <Numbers>
                    <NumberText>
                      게시물 <strong>{seeProfile.numberOfPosts}</strong>
                    </NumberText>
                    <NumberText>
                      팔로워 <strong>{seeProfile.numberOfFollowers}</strong>
                    </NumberText>
                    <NumberText>
                      팔로잉 <strong>{seeProfile.numberOfFollowings}</strong>
                    </NumberText>
                  </Numbers>
                  <OtherInfo>
                    <Name>{seeProfile.fullname}</Name>
                    <Bio>{seeProfile.bio}</Bio>
                  </OtherInfo>
                </InfoWrapper>
              </UserInfo>
              <Nav>
                <ProfileLink
                  to={`/${seeProfile.username}`}
                  onClick={() => setLocation(`home`)}
                  selected={location === "home"}
                >
                  게시물
                </ProfileLink>
                <ProfileLink
                  to={`/${seeProfile.username}/channel`}
                  onClick={() => setLocation(`channel`)}
                  selected={location === "channel"}
                >
                  IGTV
                </ProfileLink>
                {seeProfile.isSelf && (
                  <ProfileLink
                    to={`/${seeProfile.username}/saved`}
                    onClick={() => setLocation(`saved`)}
                    selected={location === "saved"}
                  >
                    Saved
                  </ProfileLink>
                )}
                <ProfileLink
                  to={`/${seeProfile.username}/tagged`}
                  onClick={() => setLocation(`tagged`)}
                  selected={location === "tagged"}
                >
                  Tagged
                </ProfileLink>
              </Nav>

              <Posts>
                <PostWrapper>
                  {location === "home" &&
                    getProfilePost.map((post, index) => {
                      return (
                        <Link to={`/p/${post.id}`} key={index}>
                          <ProfilePosts postId={post.id} key={index} />
                        </Link>
                      );
                    })}
                  {location === "channel" && <div>channel</div>}
                  {location === "saved" && seeProfile.isSelf && (
                    <div>saved</div>
                  )}
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
}

export default Profile;
