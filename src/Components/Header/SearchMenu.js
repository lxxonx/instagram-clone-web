import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Menu = styled.div`
  position: absolute;
  top: 100%;
  left: 35%;
  z-index: 4;
  width: 400px;
  height: 370px;
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
const UserNotFound = styled.div`
  text-transform: uppercase;
  display: flex;
  margin: auto;
  margin-top: 100px;
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
function SearchMenu({ users }) {
  return (
    <Menu>
      {users.length < 1 ? (
        <UserNotFound>user not found</UserNotFound>
      ) : (
        users.map((u, index) => {
          console.log(u);
          return (
            <Link to={`/${u.username}`} key={index}>
              <MenuItem>{u.username}</MenuItem>
            </Link>
          );
        })
      )}
    </Menu>
  );
}

export default SearchMenu;
