import React, { useEffect, useState } from "react";
import { Link, useLocation, Redirect } from "react-router-dom";
import styled from "styled-components";
import useMeQuery from "../Hooks/useMeQuery";
import useWidth from "../Hooks/useWidth";
import Avatar from "./Avatar";
import {
  CompassIcon,
  CompassIconBlack,
  EmptyHeartIcon,
  FilledHeartIcon,
  HomeIcon,
  HomeIconBlack,
  PaperPlaneIconBlack,
  PaperPlaneIconWhite,
} from "./Icons";

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

const SearchBox = styled.div`
  ${(props) => props.theme.whiteBox}
  background-color: ${(props) => props.theme.bgColor};
  height: 28px;
  width: 215px;
  flex: 0 1 auto;
  margin: auto;
  display: flex;
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
  display: flex;
  width: 28px;
  height: 25px;
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
  ${(props) => (props.borderAvatar ? `border: 1px solid black;` : null)}
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
  const { data, loading } = useMeQuery();
  const { pathname } = useLocation();
  const [filled, setFilled] = useState(false);
  const [borderAvatar, setBorderAvatar] = useState(false);
  const width = useWidth();

  useEffect(() => {
    if (pathname.startsWith(`/${data.me.username}`) && !filled) {
      setBorderAvatar(true);
    } else {
      setBorderAvatar(false);
    }
    return () => {};
  }, [pathname, filled]);
  return (
    <>
      {!loading && data && data.me ? (
        <Nav>
          <Box>
            <LogoWrapper to="/">
              <TextLogo src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" />
            </LogoWrapper>

            {width < 600 ? null : <SearchBox />}

            <MenuBarWrapper>
              <MenuBar>
                <LinkWrapper to="/">
                  {pathname === "/" && !filled ? (
                    <HomeIconBlack />
                  ) : (
                    <HomeIcon />
                  )}
                </LinkWrapper>
                <LinkWrapper to="/direct/inbox">
                  {pathname.startsWith("/direct/") && !filled ? (
                    <PaperPlaneIconBlack />
                  ) : (
                    <PaperPlaneIconWhite />
                  )}
                </LinkWrapper>
                <LinkWrapper to="/explore/">
                  {pathname === "/explore/" && !filled ? (
                    <CompassIconBlack />
                  ) : (
                    <CompassIcon />
                  )}
                </LinkWrapper>
                <HeartButton
                  onClick={() => {
                    setFilled(!filled);
                  }}
                >
                  {filled ? (
                    <FilledHeartIcon color={"black"} />
                  ) : (
                    <EmptyHeartIcon />
                  )}
                </HeartButton>

                <LinkWrapper
                  to={`/${data.me.username}`}
                  onClick={(e) => {
                    if (filled) {
                      e.preventDefault();
                      setBorderAvatar(false);
                    } else {
                      setBorderAvatar(true);
                    }
                  }}
                  borderAvatar={borderAvatar}
                >
                  <Avatar src={data.me.avatar} />
                </LinkWrapper>
              </MenuBar>
            </MenuBarWrapper>
          </Box>
        </Nav>
      ) : (
        <></>
      )}
    </>
  );
}

export default Header;
