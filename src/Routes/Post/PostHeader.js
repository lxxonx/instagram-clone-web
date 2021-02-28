import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const FeedHeader = styled.header`
  align-items: center;
  vertical-align: center;
  height: 60px;
  display: flex;
  padding: 16px;
`;
const Header = styled.header`
  align-items: center;
  vertical-align: center;
  height: 72px;
  display: flex;
  padding: 16px;
  width: 100%;
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
const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 8px;
`;
const OwnerName = styled(Link)`
  ${(props) => props.theme.usernameText};
  font-size: 16px;
`;
const Location = styled(Link)`
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 13px;
  font-weight: 400;
`;
function PostHeader({ username, avatar, amIFollowing, isSelf, location }) {
  if (amIFollowing === undefined) {
    return (
      <FeedHeader>
        <Owner>
          <OwnerAvatar to={`/${username}`}>
            <Avatar src={avatar === "" ? "/Images/avatar.jpg" : avatar} />
          </OwnerAvatar>
          <OwnerName to={`/${username}`}>{username}</OwnerName>
        </Owner>
        <PostMenu>
          <BiDotsHorizontalRounded />
        </PostMenu>
      </FeedHeader>
    );
  } else {
    return (
      <Header>
        <Owner>
          <OwnerAvatar to={`/${username}`}>
            <Avatar src={avatar === "" ? "/Images/avatar.jpg" : avatar} />
          </OwnerAvatar>
          <PostInfo>
            <OwnerName to={`/${username}`}>{username}</OwnerName>
            {location && (
              <Location to={`/explore/location/${location}`}>
                {location}
              </Location>
            )}
          </PostInfo>

          {isSelf ? null : <div>{amIFollowing ? "following" : "follow"}</div>}
        </Owner>
        <PostMenu>
          <BiDotsHorizontalRounded />
        </PostMenu>
      </Header>
    );
  }
}
PostHeader.propTypes = {
  username: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  amIFollowing: PropTypes.bool,
};
export default PostHeader;
