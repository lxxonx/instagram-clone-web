import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import useWidth from "../../Hooks/useWidth";
import { MyAvatar } from "../Avatar";
import {
  CompassIcon,
  CompassIconBlack,
  EmptyHeartIcon,
  FilledHeartIcon,
  HomeIcon,
  HomeIconBlack,
  PaperPlaneIconBlack,
  PaperPlaneIconWhite,
} from "../Icons";
import { refreshPage } from "../Util";
import AvatarMenu from "./AvatarMenu";
import NotificationMenu from "./NotificationMenu";
import SearchInput from "./SearchInput";
import { Menu } from "./Styles";
import { myUsernameVar } from "../../Apollo/LocalState";
import { gql, useQuery } from "@apollo/client";
import { ME } from "../SharedQueries";
const NOTIFICATION = gql`
  query notification {
    notification {
      id
      newComment {
        text
        user {
          username
          avatar
        }
        post {
          id
          photos {
            url
          }
        }
      }
      newLike {
        user {
          username
          avatar
        }
        post {
          id
          photos {
            url
          }
        }
      }
      newFollower {
        username
        avatar
        amIFollowing
      }
      createdAt
    }
  }
`;
const Nav = styled.header`
  background-color: white;
  display: flex;
  margin-bottom: 30px;
  flex-direction: column;
  border-bottom: 1px solid #dbdbdb;
  position: fixed;
  top: 0;
  left: 0;
  transition: height 0.2s ease-in-out;
  width: 100%;
  z-index: 3;
  align-items: center;
  vertical-align: center;
  height: 54px;
`;
const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  display: flex;
  max-width: 975px;
  padding: 0 20px;
  width: 100%;
  border: 0px;
  height: 100%;
  align-items: center;
  vertical-align: center;
`;
const LogoWrapper = styled(Link)`
  vertical-align: baseline;
  align-items: stretch;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  position: relative;
  flex: 1 0 0%;
  min-width: 40px;
  cursor: pointer;
`;
const TextLogo = styled.img`
  width: 108px;
`;

const MenuBar = styled(Box)`
  margin: auto;
  margin-right: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 222px;
  flex: 0 0 auto;
  height: 22px;
  display: flex;
`;
const MenuBarWrapper = styled.div`
  margin: 0;
  padding: 0;
  position: relative;
  align-content: center;
  align-items: center;
  display: flex;
  flex: 1 0 0%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-end;
`;
const LinkWrapper = styled(Link)`
  width: 100%;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  svg {
    color: black;
    width: 22px;
    height: 22px;
  }
  &:not(:last-child) {
    margin-right: 22px;
  }
`;
const AvatarButton = styled.button`
  border: 1px solid white;
  display: flex;
  width: 26px;
  height: 26px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  :focus {
    outline: none;
  }
  padding: 0;
  ${(props) => (props.borderAvatar ? `border: 1px solid black;` : null)};
`;
const HeartButton = styled.button`
  display: flex;
  padding: 0;
  cursor: pointer;
  svg {
    color: black;
    width: 22px;
    height: 22px;
  }
  &:not(:last-child) {
    margin-right: 22px;
  }
  background-color: white;
  border: 0;
  :focus {
    outline: none;
  }
`;

function HeaderContainer() {
  const { data, loading } = useQuery(ME);
  const { data: notifData, subscribeToMore } = useQuery(NOTIFICATION);

  const { pathname } = useLocation();
  const [heart, setHeart] = useState(false);
  const [profileborder, setProfileBorder] = useState(false);
  const width = useWidth();
  const [open, setOpen] = useState(false);
  const profileMenuRef = useRef();
  const heartMenuRef = useRef();

  const onClickProfile = (event) => {
    if (heart) {
      event.preventDefault();
    } else {
      setOpen(!open);
      setProfileBorder(!profileborder);
    }
  };
  const onClickHeart = () => {
    setHeart(!heart);
  };

  useEffect(() => {
    const profileMenuClickAwayListener = () => {
      setOpen(!open);
      setProfileBorder(!profileborder);
    };
    const notificationClickAwayListener = (e) => {
      if (!heartMenuRef.current.contains(e.target)) {
        setHeart(false);
      } else {
        if (e.target.tagName === "BUTTON") {
          setHeart(true);
        }
      }
    };
    myUsernameVar(data?.me?.username);

    if (profileborder)
      window.addEventListener("click", profileMenuClickAwayListener);
    if (heart) window.addEventListener("click", notificationClickAwayListener);
    return () => {
      if (profileborder)
        window.removeEventListener("click", profileMenuClickAwayListener);
      if (heart)
        window.removeEventListener("click", notificationClickAwayListener);
    };
  }, [profileborder, open, heart, width, data]);
  if (loading || !data || !notifData) {
    return null;
  } else {
    const { me } = data;
    const { notification } = notifData;
    return (
      <>
        <Helmet>
          <title>instagram-clone</title>
        </Helmet>
        <Nav>
          <Box>
            {pathname === "/" && !heart && !open ? (
              <LogoWrapper to="/" onClick={refreshPage}>
                <TextLogo src={"/Images/logo.png"} />
              </LogoWrapper>
            ) : (
              <LogoWrapper to="/">
                <TextLogo src={"/Images/logo.png"} />
              </LogoWrapper>
            )}
            {width < 600 ? null : <SearchInput />}

            <MenuBarWrapper>
              <MenuBar>
                {pathname === "/" && !heart && !open ? (
                  <LinkWrapper to="/" onClick={refreshPage}>
                    <HomeIconBlack />
                  </LinkWrapper>
                ) : (
                  <LinkWrapper to="/">
                    <HomeIcon />
                  </LinkWrapper>
                )}
                <LinkWrapper to="/direct/inbox">
                  {pathname.startsWith("/direct/") && !heart && !open ? (
                    <PaperPlaneIconBlack />
                  ) : (
                    <PaperPlaneIconWhite />
                  )}
                </LinkWrapper>
                <LinkWrapper to="/explore/">
                  {pathname === "/explore/" && !heart && !open ? (
                    <CompassIconBlack />
                  ) : (
                    <CompassIcon />
                  )}
                </LinkWrapper>
                <HeartButton onClick={onClickHeart}>
                  {heart ? (
                    <FilledHeartIcon color={"black"} />
                  ) : (
                    <EmptyHeartIcon />
                  )}
                </HeartButton>
                <Menu showing={heart} ref={heartMenuRef}>
                  <NotificationMenu
                    notification={notification}
                    subscribeToMore={subscribeToMore}
                  ></NotificationMenu>
                </Menu>
                <AvatarButton
                  borderAvatar={
                    pathname.startsWith(`/${me.username}`) || profileborder
                  }
                  onClick={onClickProfile}
                >
                  <MyAvatar />
                  <Menu showing={open} ref={profileMenuRef}>
                    <AvatarMenu username={me.username} />
                  </Menu>
                </AvatarButton>
              </MenuBar>
            </MenuBarWrapper>
          </Box>
        </Nav>
      </>
    );
  }
}

export default HeaderContainer;
