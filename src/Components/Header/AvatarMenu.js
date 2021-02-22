import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const LOGOUT = gql`
  mutation logUserOut {
    logUserOut @client
  }
`;

const Menu = styled.div`
  position: absolute;
  top: 150%;
  left: 35%;
  z-index: 3;
  width: 230px;
  height: ${(props) => props.height}px;
  border-radius: 6px;
  box-shadow: 0 0 5px 1px rgba(var(--jb7, 0, 0, 0), 0.0975);
  transition: opacity 75ms linear, transform 38ms ease-out,
    -webkit-transform 38ms ease-out;
  transform-origin: top center;
  align-items: stretch;
  background-color: white;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
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
function AvatarMenu({ username }) {
  const [logout] = useMutation(LOGOUT);

  const onClickLogout = async () => {
    await logout();
  };
  return (
    <Menu>
      <Link to={`/${username}`}>
        <MenuItem>profile</MenuItem>
      </Link>
      <Link to={`/${username}/saved`}>
        <MenuItem>saved</MenuItem>
      </Link>
      <Link to={`/account/edit`}>
        <MenuItem>settings</MenuItem>
      </Link>
      <MenuItem onClick={onClickLogout}>log out</MenuItem>
    </Menu>
  );
}

export default AvatarMenu;
