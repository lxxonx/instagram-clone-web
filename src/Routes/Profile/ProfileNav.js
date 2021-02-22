import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
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
      ? `border-top: 1px solid black; font-weight: 600;`
      : null;
  }}
  ::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
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

function ProfileNav({ username, setLocation, location, isSelf }) {
  return (
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
      {isSelf && (
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
  );
}

export default ProfileNav;
