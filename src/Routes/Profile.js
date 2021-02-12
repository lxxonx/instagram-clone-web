import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Components/Avatar";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import ProfilePosts from "./ProfilePosts";

const PROFILE = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      avatar
      fullname
      bio
      isSelf
      numberOfFollowers
      numberOfFollowings
      numberOfPosts
      amIFollowing
      saved {
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
  }
`;
const FOLLOW = gql`
  mutation follow($username: String!) {
    follow(username: $username)
  }
`;
const UNFOLLOW = gql`
  mutation unfollow($username: String!) {
    unfollow(username: $username)
  }
`;
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

const Wrapper = styled.div`
  padding: 30px 0 20px;
`;
const UserInfo = styled.header`
  background-color: ${(props) => props.theme.bgColor};
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
  margin-top: 5px;
`;
const AvatarWrapper = styled.div`
  max-width: 293px;
  width: 100%;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
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
  text-transform: uppercase;
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
const FUEButton = styled.button`
  height: 30px;
  font-weight: 600;
  text-transform: uppercase;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => {
    if (props.name === "follow") return props.theme.blueColor;
    else return `white`;
  }};
  color: ${(props) => {
    if (props.name === "follow") return `white`;
    else return `black`;
  }};
  :focus {
    outline: none;
  }
  cursor: pointer;
`;
const EditLink = styled(Link)`
  cursor: pointer;
`;

function Profile() {
  const { username } = useParams();
  const { pathname } = useLocation();
  const [limit, setLimit] = useState(21);
  const [location, setLocation] = useState(`home`);
  const { data, loading } = useQuery(PROFILE, { variables: { username } });
  const { data: postData, loading: postLoading } = useQuery(POSTS, {
    variables: { username, limit, offset: 0 },
    fetchPolicy: "no-cache",
  });
  const [follow] = useMutation(FOLLOW, {
    variables: { username },
  });
  const [unfollow] = useMutation(UNFOLLOW, {
    variables: { username },
  });
  const [amIFollowing, setAmIFollowing] = useState(true);
  const [followers, setFollowers] = useState(0);
  const inputFile = useRef(null);

  const changeAvatar = (event) => {
    const {
      target: { files },
    } = event;
  };
  const openFile = () => {
    inputFile.current.click();
  };
  const onClick = async (e) => {
    const {
      target: { name },
    } = e;
    switch (name) {
      case "follow":
        await follow({
          update: ({ loading }) => {
            if (!loading) {
              setAmIFollowing(true);
              setFollowers(followers + 1);
            }
          },
        });
        break;
      case "unfollow":
        await unfollow({
          update: ({ loading }) => {
            if (!loading) {
              setAmIFollowing(false);
              setFollowers(followers - 1);
            }
          },
        });
        break;

      default:
        //edit profile
        break;
    }
  };
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
    if (!loading && data) {
      setAmIFollowing(data.seeProfile.amIFollowing);
      setFollowers(data.seeProfile.numberOfFollowers);
    }
    return () => {};
  }, [username, pathname, loading, data]);
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
              <input
                onChange={changeAvatar}
                type="file"
                ref={inputFile}
                style={{ display: "none" }}
              />

              <UserInfo>
                <AvatarWrapper onClick={openFile}>
                  <Avatar src={seeProfile.avatar} size={150} />
                </AvatarWrapper>
                <InfoWrapper>
                  <Username>
                    {username}{" "}
                    {seeProfile.isSelf ? (
                      <EditLink to="/account/edit">
                        <FUEButton name="edit" onClick={onClick}>
                          edit profile
                        </FUEButton>
                      </EditLink>
                    ) : amIFollowing ? (
                      <FUEButton name="unfollow" onClick={onClick}>
                        unfollow
                      </FUEButton>
                    ) : (
                      <FUEButton name="follow" onClick={onClick}>
                        follow
                      </FUEButton>
                    )}
                  </Username>
                  <Numbers>
                    <NumberText>
                      게시물 <strong>{seeProfile.numberOfPosts}</strong>
                    </NumberText>
                    <NumberText>
                      팔로워 <strong>{followers}</strong>
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
                  to={`/${username}`}
                  onClick={() => setLocation(`home`)}
                  selected={location === "home"}
                >
                  게시물
                </ProfileLink>
                <ProfileLink
                  to={`/${username}/channel`}
                  onClick={() => setLocation(`channel`)}
                  selected={location === "channel"}
                >
                  IGTV
                </ProfileLink>
                {seeProfile.isSelf && (
                  <ProfileLink
                    to={`/${username}/saved`}
                    onClick={() => setLocation(`saved`)}
                    selected={location === "saved"}
                  >
                    Saved
                  </ProfileLink>
                )}
                <ProfileLink
                  to={`/${username}/tagged`}
                  onClick={() => setLocation(`tagged`)}
                  selected={location === "tagged"}
                >
                  Tagged
                </ProfileLink>
              </Nav>

              <Posts>
                <PostWrapper>
                  {location === "home" &&
                    (getProfilePost.length > 0
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
                      : "you have no post")}
                  {location === "channel" && <div>channel</div>}
                  {location === "saved" &&
                    seeProfile.isSelf &&
                    (seeProfile.saved.length > 0
                      ? seeProfile.saved.map((saved, index) => {
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
                      : "you have no saved post")}
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
