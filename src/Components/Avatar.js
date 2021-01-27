import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Picture = styled.img`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  overflow: hidden;
  object-fit: cover;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: ${(props) => props.radius}px;
`;
function Avatar({
  src = "https://scontent-gmp1-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-gmp1-1.cdninstagram.com&_nc_ohc=d0j1pWabatQAX-62E8j&oh=7a9aea496817d678b07248b41f7dd7c1&oe=603C4E0F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2",
  size = 22,
  radius = 30,
}) {
  return <Picture src={src} size={size} radius={radius} />;
}
Avatar.propTypes = {
  src: PropTypes.string,
  size: PropTypes.number,
};
export default Avatar;
