import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import useInput from "../Hooks/useInput";
import useWidth from "../Hooks/useWidth";
import Avatar from "./Avatar";
import FeedActions from "./FeedActions";
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
import { ME } from "./SharedQueries";

const LOGOUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;
const SEARCH = gql`
  query searchUsers($query: String!) {
    searchUsers(query: $query) {
      username
      avatar
      fullname
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
  flex: 1 9999 0%;
  min-width: 40px;
  cursor: pointer;
`;
const TextLogo = styled.img`
  width: 108px;
`;

const SearchBox = styled.input`
  ${(props) => props.theme.whiteBox}
  background-color: ${(props) => props.theme.bgColor};
  height: 28px;
  width: 215px;
  flex: 0 1 auto;
  margin: auto;
  display: flex;
  padding: 0 15px;
  font-size: 12px;
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
  ${(props) => (props.borderAvatar ? `border: 1px solid black;` : null)};
  display: flex;
  width: 24px;
  height: 24px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  :focus {
    outline: none;
  }
  padding: 0;
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
const MenuWrapper = styled.div`
  display: ${(props) => {
    return props.showing ? `block` : `none`;
  }};
  position: absolute;
  top: 50px;
  right: ${(props) => props.xLocation}px;
  z-index: 3;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  flex-shrink: 0;
  margin: 0;
  padding: 0;
  border-radius: 6px;
  box-shadow: 0 0 5px 1px rgba(var(--jb7, 0, 0, 0), 0.0975);
  transform: translateY(0);
  transition: opacity 75ms linear, transform 38ms ease-out,
    -webkit-transform 38ms ease-out;
  transform-origin: top center;
  overflow-x: auto;
  overflow-y: hidden;
`;

const Menu = styled.div`
  align-items: stretch;
  border: 0;
  background-color: white;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  height: 100%;
  width: 100%;
`;
const MenuItem = styled.div`
  text-transform: capitalize;
  width: 100%;
  height: 37px;
  justify-content: flex-start;
  align-items: center;
  display: flex;
  padding: 8px 16px;
  font-size: 16px;
  :hover {
    background-color: ${(props) => props.theme.lightGreyColor};
  }
  cursor: pointer;
`;
function Header() {
  const { data, loading } = useQuery(ME);
  const { pathname } = useLocation();
  const [filled, setFilled] = useState(false);
  const [profileborder, setProfileBorder] = useState(false);
  const width = useWidth();
  const [modalLocation, setModalLocation] = useState(0);
  const [logout] = useMutation(LOGOUT);
  const [open, setOpen] = useState(false);
  const searchInput = useInput("");
  const { data: searchData, loading: searchLoading } = useQuery(SEARCH, {
    variables: {
      query: searchInput.value,
    },
    update: ({ data, loading }) => {
      if (!loading) {
        console.log(data);
      }
    },
  });
  const [search, setSearch] = useState(false);
  console.log("search.value: ", searchInput.value);
  console.log("searchData: ", searchData);

  const onClickLogout = async () => {
    await logout();
  };
  const onClickProfile = (event) => {
    const { clientX } = event;
    if (filled) {
      event.preventDefault();
    } else {
      setModalLocation(width - clientX - 40);
      setOpen(!open);
      setProfileBorder(!profileborder);
    }
  };
  const onClickHeart = (event) => {
    const { clientX } = event;
    setFilled(!filled);
    setModalLocation(width - clientX - 90);
  };
  useEffect(() => {
    const listener = () => {
      // Do nothing if clicking ref's element or descendent elements
      // if (!profileMenu.current || profileMenu.current.contains(event.target)) {
      // }
      setOpen(!open);
      setProfileBorder(!profileborder);
    };
    const clickAwayListener = () => {
      setFilled(false);
      setSearch(false);
    };
    const resizeHandler = () => {
      if (width < 1000) {
        setModalLocation(3);
      } else {
        setModalLocation((width - 960) / 2);
      }
    };
    if (profileborder) window.addEventListener("click", listener);
    if (filled || search) window.addEventListener("click", clickAwayListener);
    window.addEventListener("resize", resizeHandler);

    return () => {
      if (profileborder) window.removeEventListener("click", listener);
      if (filled || search)
        window.removeEventListener("click", clickAwayListener);
      window.removeEventListener("resize", resizeHandler);
    };
  }, [profileborder, open, pathname, data, filled, width, search]);

  if (loading || !data) {
    return <></>;
  } else {
    return (
      <>
        <Nav>
          <MenuWrapper
            showing={search}
            xLocation={modalLocation}
            width={530}
            height={330}
          >
            <Menu>
              {searchData &&
                !searchLoading &&
                searchData.searchUsers.map((user) => {
                  return (
                    <LinkWrapper to={`/${user.username}`}>
                      <MenuItem>
                        <Avatar src={user.avatar} />
                        {user.username}
                      </MenuItem>
                    </LinkWrapper>
                  );
                })}
            </Menu>
          </MenuWrapper>
          <Box>
            <LogoWrapper to="/">
              <TextLogo src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" />
            </LogoWrapper>

            {width < 600 ? null : (
              <SearchBox
                placeholder="search"
                value={searchInput.value}
                onChange={(e) => {
                  e.target.value === "" ? setSearch(false) : setSearch(true);
                  searchInput.onChange(e);
                }}
              ></SearchBox>
            )}

            <MenuBarWrapper>
              <MenuBar>
                <LinkWrapper to="/">
                  {pathname === "/" && !filled && !open ? (
                    <HomeIconBlack />
                  ) : (
                    <HomeIcon />
                  )}
                </LinkWrapper>
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
                </HeartButton>

                <AvatarButton
                  borderAvatar={
                    pathname.startsWith(`/${data.me.username}`) || profileborder
                  }
                  onClick={onClickProfile}
                >
                  <Avatar src={data.me.avatar} />
                </AvatarButton>
              </MenuBar>
            </MenuBarWrapper>
          </Box>
          <MenuWrapper showing={open} xLocation={modalLocation} width={230}>
            <Menu>
              <LinkWrapper to={`/${data.me.username}`}>
                <MenuItem>profile</MenuItem>
              </LinkWrapper>
              <LinkWrapper to={`/${data.me.username}/saved`}>
                <MenuItem>saved</MenuItem>
              </LinkWrapper>
              <LinkWrapper to={`/account/edit`}>
                <MenuItem>settings</MenuItem>
              </LinkWrapper>
              <MenuItem onClick={onClickLogout}>log out</MenuItem>
            </Menu>
          </MenuWrapper>
          <MenuWrapper
            showing={filled}
            xLocation={modalLocation}
            width={530}
            height={330}
          >
            <Menu>
              <FeedActions username={data.me.username}></FeedActions>
            </Menu>
          </MenuWrapper>
        </Nav>
      </>
    );
  }
}

export default Header;
