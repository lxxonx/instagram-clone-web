import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import useInput from "../../Hooks/useInput";
import useWidth from "../../Hooks/useWidth";
import Avatar from "../Avatar";
import FeedActions from "../FeedActions";
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
import { ME } from "../SharedQueries";
import { refreshPage } from "../Util";
import AvatarMenu from "./AvatarMenu";
import NotificationMenu from "./NotificationMenu";
import SearchInput from "./SearchInput";
import { Menu } from "./Styles";

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
  flex: 1 9999 0%;
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

function Header() {
  const { data, loading } = useQuery(ME);
  const { pathname } = useLocation();
  const [filled, setFilled] = useState(false);
  const [profileborder, setProfileBorder] = useState(false);
  const width = useWidth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef();
  const onClickProfile = (event) => {
    if (filled) {
      event.preventDefault();
    } else {
      setOpen(!open);
      setProfileBorder(!profileborder);
    }
  };
  const onClickHeart = () => {
    setFilled(!filled);
  };

  useEffect(() => {
    const listener = () => {
      setOpen(!open);
      setProfileBorder(!profileborder);
    };
    const clickAwayListener = () => {
      setFilled(false);
    };

    if (profileborder) window.addEventListener("click", listener);
    if (filled) window.addEventListener("click", clickAwayListener);
    return () => {
      if (profileborder) window.removeEventListener("click", listener);
      if (filled) window.removeEventListener("click", clickAwayListener);
    };
  }, [profileborder, open, data, filled, width]);
  if (loading || !data) {
    return null;
  } else {
    return (
      <>
        <Helmet>
          <title>instagram-clone</title>
        </Helmet>
        <Nav>
          <Box>
            {pathname === "/" && !filled && !open ? (
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
                {pathname === "/" && !filled && !open ? (
                  <LinkWrapper to="/" onClick={refreshPage}>
                    <HomeIconBlack />
                  </LinkWrapper>
                ) : (
                  <LinkWrapper to="/">
                    <HomeIcon />
                  </LinkWrapper>
                )}
                <LinkWrapper to="/direct/inbox">
                  {pathname.startsWith("/direct/") && !filled && !open ? (
                    <PaperPlaneIconBlack />
                  ) : (
                    <PaperPlaneIconWhite />
                  )}
                </LinkWrapper>
                <LinkWrapper to="/explore/">
                  {pathname === "/explore/" && !filled && !open ? (
                    <CompassIconBlack />
                  ) : (
                    <CompassIcon />
                  )}
                </LinkWrapper>
                <HeartButton onClick={onClickHeart}>
                  {filled ? (
                    <FilledHeartIcon color={"black"} />
                  ) : (
                    <EmptyHeartIcon />
                  )}
                  <Menu showing={filled} ref={menuRef}>
                    <NotificationMenu
                      username={data.me.username}
                    ></NotificationMenu>
                  </Menu>
                </HeartButton>

                <AvatarButton
                  borderAvatar={
                    pathname.startsWith(`/${data.me.username}`) || profileborder
                  }
                  onClick={onClickProfile}
                >
                  <Avatar src={data.me.avatar} />
                  <Menu showing={open} ref={menuRef}>
                    <AvatarMenu username={data.me.username} />
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

export default Header;
