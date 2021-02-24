import React from "react";
import styled from "styled-components";
const Menu = styled.div`
  position: absolute;
  top: 150%;
  left: -40%;
  z-index: 3;
  width: 500px;
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
  overflow-y: auto;
  padding-top: 10px;
`;
function NotificationMenu({ username }) {
  return <Menu>{username}</Menu>;
}

export default NotificationMenu;
