import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

const Post = styled.div`
  background-image: ${(props) => {
    return `url(${props.src})`;
  }};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  max-height: 293px;
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
`;
const Info = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  opacity: 0;
  height: 100%;
  width: 100%;
  :hover {
    background-color: rgba(0, 0, 0, 0.4); /*  40% opaque green */
    opacity: 1;
  }
`;
const StackIcon = styled.div`
  position: absolute;
  font-size: 26px;
  right: 10px;
  top: 10px;
`;
const Text = styled.div`
  color: white;
  font-size: 26px;
  :not(:last-child) {
    margin-right: 15px;
  }
`;

function ProfilePosts({ url, numberOfLikes, numberOfComments, isManyPhotos }) {
  return (
    <Post src={url}>
      {isManyPhotos && <StackIcon>📑</StackIcon>}
      <Info>
        <Text>❤️{numberOfLikes}</Text>
        <Text>💬{numberOfComments}</Text>
      </Info>
    </Post>
  );
}
ProfilePosts.propTypes = {
  url: PropTypes.string.isRequired,
  numberOfLikes: PropTypes.number.isRequired,
  numberOfComments: PropTypes.number.isRequired,
  isManyPhotos: PropTypes.bool.isRequired,
};
export default ProfilePosts;
