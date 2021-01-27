import React from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  EmptyHeartIcon,
  FilledHeartIcon,
  NoAvatar,
  PaperPlaneIconWhite,
  SaveLabel,
  TextBalloon,
} from "../../Components/Icons";
const Post = styled.article`
  ${(props) => {
    if (props.width < 640) {
      return `
      border: 0;
      background-color: ${props.theme.bgColor};
      margin-bottom: 4px;`;
    }
    return `${props.theme.whiteBox}
    margin-bottom: 60px;
`;
  }}
  max-width: ${(props) => props.theme.postMaxWidth};
  width: 100%;
  align-items: center;
  vertical-align: center;
`;

const PostHeader = styled.header`
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
const PostOwner = styled.div`
  margin-left: 0;
  display: flex;
  align-items: center;
  vertical-align: center;
  flex: 1 9999 0%;
`;

const OwnerAva = styled(Link)`
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
  color: ${(props) => props.theme.blackColor};
  padding: 5px;
  font-size: 15px;
  font-weight: 900;
`;
const PostPhoto = styled.img`
  width: 100%;
  max-height: ${(props) => {
    return `${parseInt(props.theme.postMaxWidth) * 1.001}px`;
  }};
  min-height: ${(props) => {
    return `${parseInt(props.theme.postMaxWidth) * 0.998}px`;
  }};
  overflow: hidden;
  flex-direction: row;
  object-fit: cover;
`;
const IconWrapper = styled.div`
  display: flex;
  padding: 0 8px;
  margin-top: 4px;
  flex-direction: row;
`;
const IconButtons = styled.button`
  background-color: white;
  padding: 8px;
  border: 0;
  width: 40px;
  height: 40px;
  :focus {
    outline: none;
  }
  cursor: pointer;
`;
const Icons = styled.section`
  margin-left: 0;
`;
const SaveLableWrapper = styled.div`
  margin-right: 0;
`;
const PostPhotoWrapper = styled.div`
  display: flex;
`;

const TextWrapper = styled.div`
  padding: 0 16px;
`;
const NumberOfLikes = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
`;
const CommentsWrapper = styled.div``;
const UserText = styled.div`
  line-height: -5px;
  vertical-align: center;
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-bottom: 4px;
`;
const Username = styled(Link)`
  color: black;
  font-size: 15px;
  font-weight: 600;
  margin-right: 6px;
  :hover {
    text-decoration: underline;
  }
`;

const Text = styled.div``;

const CreatedTime = styled.div`
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 10px;
  cursor: pointer;
  margin: 12px 0;
`;
const AddComment = styled.div``;
function FeedPostPresenter({
  id,
  width,
  photos,
  user,
  filled,
  comments,
  timeAgo,
  numberOfLikes,
  toggleLike,
  caption,
}) {
  return (
    <Post width={width}>
      <PostHeader>
        <PostOwner>
          <OwnerAva to={user.username}>
            {user.avatar ? (
              <Avatar src={user.avatar} />
            ) : (
              <NoAvatar viewBox="0 -2 16 16" />
            )}
          </OwnerAva>
          <OwnerName to={user.username}>{user.username}</OwnerName>
        </PostOwner>
        <PostMenu>
          <BiDotsHorizontalRounded />
        </PostMenu>
      </PostHeader>
      <PostPhotoWrapper>
        {photos.map((photo) => (
          <PostPhoto src={photo.url} key={photo.id} id={photo.id} />
        ))}
      </PostPhotoWrapper>
      <IconWrapper>
        <Icons>
          <IconButtons onClick={toggleLike}>
            {filled ? (
              <FilledHeartIcon size={24} />
            ) : (
              <EmptyHeartIcon size={24} />
            )}
          </IconButtons>
          <IconButtons>
            <TextBalloon />
          </IconButtons>
          <IconButtons>
            <PaperPlaneIconWhite size={24} />
          </IconButtons>
        </Icons>
        <SaveLableWrapper>
          <IconButtons>
            <SaveLabel />
          </IconButtons>
        </SaveLableWrapper>
      </IconWrapper>
      <TextWrapper>
        {numberOfLikes > 0 ? (
          <NumberOfLikes>좋아요 {numberOfLikes}개</NumberOfLikes>
        ) : null}

        <UserText>
          <Username to={`/${user.username}`}>{user.username}</Username>
          <Text>{caption}</Text>
        </UserText>
        {/* {fetchmore } */}
        <CommentsWrapper>
          {comments.map((comment) => {
            return (
              <UserText key={comment.id}>
                <Username to={`/${comment.user.username}`}>
                  {comment.user.username}
                </Username>
                <Text>{comment.text}</Text>
              </UserText>
            );
          })}
        </CommentsWrapper>
        <CreatedTime>{timeAgo} Ago</CreatedTime>
        <form>
          <AddComment></AddComment>
        </form>
      </TextWrapper>
    </Post>
  );
}

export default FeedPostPresenter;
