import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { MYAVATAR } from "./SharedQueries";

const Picture = styled.img`
  width: ${(props) => props.size}px;
  box-sizing: content-box;
  height: ${(props) => props.size}px;
  overflow: hidden;
  object-fit: cover;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 50%;
  border: 1px solid transparent;
`;

export const MyAvatar = ({ size = 22 }) => {
  const { data, loading } = useQuery(MYAVATAR);
  let avatarSrc = "/Images/avatar.jpg";
  if (loading || !data) return null;
  else {
    if (data.me.avatar !== "") {
      avatarSrc = data.me.avatar;
    }
    return <Picture size={size} src={avatarSrc} />;
  }
};

function Avatar({ src, size = 22 }) {
  const url = src === "" ? "/Images/avatar.jpg" : src;
  return <Picture src={url} size={size} />;
}
Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.number,
};
export default Avatar;
