import React from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { GoPrimitiveDot } from "react-icons/go";
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
  margin-right: 0;
`;
const PhotoIndex = styled.div`
  margin: auto;
  flex: 1 1 99999px;
  justify-content: center;
  display: flex;
`;
const Icons = styled.section`
  margin: 0;
  display: flex;
  flex: 1 1 9999px;
  align-items: center;
  vertical-align: center;
`;
const SaveLableWrapper = styled.div`
  margin-left: auto;
  margin-right: 0;
  flex: 1 1 auto;
  display: flex;
  justify-content: flex-end;
  min-width: 120px;
`;
const PostPhotoWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  vertical-align: center;
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

  box-sizing: border-box;
  display: flex;
`;
const PhotoList = styled.ul`
  list-style: none;
  display: flex;
  margin-bottom: 100%;
  flex-direction: row;
`;
const PhotoListElement = styled.li`
  width: 100%;
  height: width;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.showing === "true" ? 1 : 0)};
`;
const SlideButtonLeft = styled.button`
  background-color: ${(props) => props.theme.darkGreyColor};
  color: white;
  font-stretch: ultra-expanded;
  font-weight: 900;
  position: absolute;
  left: 15px;
  border: 0;
  z-index: 2;
  opacity: 0.15;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  :focus {
    outline: none;
  }
  :hover {
    opacity: 0.5;
  }
`;
const SlideButtonRight = styled.button`
  background-color: ${(props) => props.theme.darkGreyColor};
  color: white;
  font-weight: 900;
  position: absolute;
  right: 15px;
  border: 0;
  z-index: 2;
  opacity: 0.2;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  :focus {
    outline: none;
  }
  :hover {
    opacity: 0.5;
  }
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
const AddComment = styled.form`
  padding: 0 16px;
  border: 0;
  width: 100%;
  border-top: 1px solid #dbdbdb;
  height: 50px;
  display: flex;
  vertical-align: center;
  align-items: center;
`;
const InputComment = styled.textarea`
  width: 100%;
  font-size: 14px;
  height: 20px;
  border: 0;
  resize: none;
  overflow: hidden;
  &:focus {
    outline: none;
  }
`;
const PostButton = styled.button`
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  height: 35px;
  font-size: 15px;
  padding: 0;
  color: ${(props) => props.theme.blueColor};
  text-align: center;
  font-weight: 600;
  text-transform: capitalize;
  ${(props) => {
    if (props.isEmpty) {
      return `opacity: 0.3;  pointer-events: none;`;
    }
  }};
  :focus {
    outline: none;
  }
`;
const SlideIndex = styled(GoPrimitiveDot)`
  color: ${(props) => {
    return props.showing === "true"
      ? props.theme.blueColor
      : props.theme.darkGreyColor;
  }};
`;

function FeedPostPresenter({
  id,
  width,
  photos,
  user,
  filled,
  comments,
  timeAgo,
  likesCount,
  toggleLike,
  caption,
  newComment,
  onSubmit,
  onKeyDown,
  nextSlide,
  prevSlide,
  currentSlide,
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
        {photos.length > 1 ? (
          <>
            <SlideButtonLeft onClick={prevSlide}>{`<`}</SlideButtonLeft>
            <SlideButtonRight onClick={nextSlide}>{`>`}</SlideButtonRight>
            <PhotoList>
              {photos.map((photo, index) => (
                <PhotoListElement
                  showing={`${index === currentSlide}`}
                  key={photo.id}
                >
                  <PostPhoto src={photo.url} key={photo.id} id={photo.id} />
                </PhotoListElement>
              ))}
            </PhotoList>
          </>
        ) : (
          <PostPhoto src={photos[0].url} id={photos[0].id} />
        )}
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
        {photos.length > 1 ? (
          <PhotoIndex>
            {photos.map((photo, index) => (
              <SlideIndex
                key={photo.id}
                id={photo.id}
                showing={`${index === currentSlide}`}
              ></SlideIndex>
            ))}
          </PhotoIndex>
        ) : null}
        <SaveLableWrapper>
          <IconButtons>
            <SaveLabel />
          </IconButtons>
        </SaveLableWrapper>
      </IconWrapper>
      <TextWrapper>
        {likesCount > 0 ? (
          <NumberOfLikes>좋아요 {likesCount}개</NumberOfLikes>
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
      </TextWrapper>

      <AddComment onSubmit={onSubmit}>
        <InputComment
          value={newComment.value}
          onChange={newComment.onChange}
          onKeyDown={onKeyDown}
        />
        <PostButton text={"post"} isEmpty={newComment.value === ""}>
          post
        </PostButton>
      </AddComment>
    </Post>
  );
}

export default FeedPostPresenter;
