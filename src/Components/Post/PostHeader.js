import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const Header = styled.header`
  align-items: center;
  vertical-align: center;
  height: 60px;
  display: flex;
  padding: 16px;
`;
const PostMenu = styled.div`
  margin-right: 0;
  padding: 8px;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
  }
`;
const Owner = styled.div`
  margin-left: 0;
  display: flex;
  align-items: center;
  vertical-align: center;
  flex: 1 9999 0%;
`;

const OwnerAvatar = styled(Link)`
  height: 42px;
  width: 42px;
  display: flex;
  align-items: center;
  vertical-align: center;
  margin-left: 0;
`;
const Avatar = styled.img`
  height: 38px;
  width: 38px;
  overflow: hidden;
  object-fit: cover;
  border-radius: 30px;
  margin-left: 0;
`;

const OwnerName = styled(Link)`
  ${(props) => props.theme.usernameText};
`;
function PostHeader({ username, avatar }) {
  return (
    <Header>
      <Owner>
        <OwnerAvatar to={username}>
          <Avatar src={avatar} />
        </OwnerAvatar>
        <OwnerName to={username}>{username}</OwnerName>
      </Owner>
      <PostMenu>
        <BiDotsHorizontalRounded />
      </PostMenu>
    </Header>
  );
}
PostHeader.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};
export default PostHeader;
