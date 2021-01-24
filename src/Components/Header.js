import { gql } from "apollo-boost";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import { AiFillHome } from "react-icons/ai";
import { BsHeart, BsPersonFill } from "react-icons/bs";
import { ImCompass2 } from "react-icons/im";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Loader from "./Loader";

const Nav = styled.nav`
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
  width: 100%;
  border: 0px;
  height: 100%;
  align-items: center;
  vertical-align: center;
`;
const LogoWrapper = styled.div`
  vertical-align: baseline;
  align-items: stretch;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  position: relative;
  flex: 1 9999 0%;
  min-width: 40px;
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
  width: 22px;
  height: 22px;
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

const ME = gql`
  query me {
    me {
      username
    }
  }
`;

function Header() {
  const { data, loading } = useQuery(ME);
  return (
    <>
      {loading ? (
        <></>
      ) : (
        <Nav>
          <Box>
            <LogoWrapper>
              <TextLogo src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1200px-Instagram_logo.svg.png" />
            </LogoWrapper>
            <SearchBox />
            <MenuBarWrapper>
              <MenuBar>
                <LinkWrapper to="/">
                  <AiFillHome />
                </LinkWrapper>
                <LinkWrapper to="/direct/inbox">
                  <IoPaperPlaneOutline />
                </LinkWrapper>
                <LinkWrapper to="/explore">
                  <ImCompass2 />
                </LinkWrapper>
                <LinkWrapper to="/explore">
                  <BsHeart />
                </LinkWrapper>
                <LinkWrapper to={!data ? "/#" : data.me.username}>
                  <BsPersonFill />
                </LinkWrapper>
              </MenuBar>
            </MenuBarWrapper>
          </Box>
        </Nav>
      )}
    </>
  );
}

export default Header;
