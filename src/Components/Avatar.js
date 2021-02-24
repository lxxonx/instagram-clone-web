import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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
function Avatar({ src, size = 22 }) {
  return <Picture src={src} size={size} />;
}
Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.number,
};
export default Avatar;
