import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../../Components/Avatar";
import { ADD_COMMENT, LIKE } from "../../Components/SharedQueries";
import { timeSince } from "../../Components/Util";
import useInput from "../../Hooks/useInput";
import { Divider } from "../../Styles/Divider";
import PostAddComment from "./PostAddComment";
import PostHeader from "./PostHeader";
import PostIcons from "./PostIcons";
import PostPhotos from "./PostPhotos";

const Wrapper = styled.article`
  ${(props) => props.theme.whiteBox};
  margin-top: 40px;
  display: flex;
  flex-direction: row;
`;
const FeedWrapper = styled.article`
  ${(props) => props.theme.whiteBox};
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
`;
const Photos = styled.div`
  overflow: hidden;
  width: 100%;
  max-width: 614px;
  max-height: 614px;
`;
const Sections = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  ${(props) => (props.maxWidth ? `max-width: ${props.maxWidth}px;` : null)};
  max-height: 614px;
`;
const CreatedTime = styled.section`
  display: flex;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 10px;
  padding: 0 16px;
  margin-top: 5px;
  text-transform: uppercase;
  a {
    color: ${(props) => props.theme.darkGreyColor};
  }
  :hover {
    span {
      visibility: visible;
    }
  }
  order: ${(props) => props.order};
`;
const CreatedDate = styled.span`
  position: absolute;
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  z-index: 1;
`;
const NumberOfLikes = styled.section`
  display: flex;
  font-size: 16px;
  padding: 0 16px 5px 16px;
  strong {
    font-weight: 600;
  }
  order: ${(props) => props.order};
`;
const Comments = styled.section`
  padding: 0 16px;
  display: flex;
  order: ${(props) => props.order};
  height: 100%;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  flex-direction: row;
`;
const Text = styled.div`
  line-height: 15px;
  display: block;
  position: relative;
`;
const Username = styled.span`
  margin-right: 5px;
  a {
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 5px;
    margin-left: -5px;
  }
`;
const Caption = styled.span`
  vertical-align: baseline;
  overflow-wrap: break-word;
`;
const Comment = styled.div`
  display: flex;
  flex-direction: row;
`;
function PostContainer({
  id,
  user,
  isLiked,
  isSaved,
  photos,
  createdAt,
  numberOfLikes,
  caption,
  location,
  comments,
}) {
  const { postId } = useParams();
  const newComment = useInput("");
  const [likesCount, setLikesCount] = useState(numberOfLikes);
  const [liked, setLiked] = useState(isLiked);
  const timeAgo = timeSince(new Date(createdAt * 1));
  const createdDate = new Date(createdAt * 1).toString();
  // const width = useWidth();
  const captionArr = caption.split(" ", 20).join(" ");

  const [toggleLike] = useMutation(LIKE, {
    variables: { postId: id },
    update: ({ loading }) => {
      if (loading) {
      }
      liked ? setLikesCount(likesCount - 1) : setLikesCount(likesCount + 1);
      setLiked(!liked);
    },
  });
  const [addComment] = useMutation(ADD_COMMENT, {
    variables: { text: newComment.value, postId: id },
  });

  const handleAddComment = async (e) => {
    e.preventDefault();
    newComment.setValue("");
    await addComment();
  };
  const onKeyDown = async (e) => {
    const { keyCode } = e;
    if (keyCode === 13) {
      e.preventDefault();
      newComment.setValue("");
      await addComment();
    }
  };
  const TOTAL_SLIDES = photos.length;
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    if (currentSlide !== TOTAL_SLIDES - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide !== 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  if (postId) {
    return (
      <Wrapper>
        <Photos>
          <PostPhotos
            toggleLike={toggleLike}
            photos={photos}
            prevSlide={prevSlide}
            nextSlide={nextSlide}
            currentSlide={currentSlide}
          />
        </Photos>
        <Sections maxWidth={335}>
          <PostHeader
            username={user.username}
            avatar={user.avatar}
            amIFollowing={user.amIFollowing}
            isSelf={user.isSelf}
            location={location}
          />
          <Divider />
          <Comments order={2}>
            <div>
              <Avatar
                src={user.avatar === "" ? "/Images/avatar.jpeg" : user.avatar}
                size={38}
              />
            </div>
            <Text>
              <Username>
                <Link>{user.username}</Link>
              </Username>
              <Caption>
                <span>{caption}</span>
              </Caption>
            </Text>
          </Comments>

          <PostIcons
            order={3}
            id={id}
            isSaved={isSaved}
            liked={liked}
            toggleLike={toggleLike}
            photos={photos}
            currentSlide={currentSlide}
          />
          <NumberOfLikes order={4}>
            <strong>{likesCount} likes</strong>
          </NumberOfLikes>
          <CreatedTime order={5}>
            {timeAgo} <CreatedDate>{createdDate}</CreatedDate>
          </CreatedTime>
          <PostAddComment
            order={6}
            handleAddComment={handleAddComment}
            newComment={newComment}
            onKeyDown={onKeyDown}
          />
        </Sections>
      </Wrapper>
    );
  } else {
    return (
      <FeedWrapper>
        <PostHeader username={user.username} avatar={user.avatar} />

        <Photos>
          <PostPhotos
            toggleLike={toggleLike}
            photos={photos}
            prevSlide={prevSlide}
            nextSlide={nextSlide}
            currentSlide={currentSlide}
          />
        </Photos>
        <Sections>
          <PostIcons
            order={2}
            id={id}
            isSaved={isSaved}
            liked={liked}
            toggleLike={toggleLike}
            photos={photos}
            currentSlide={currentSlide}
          />
          {likesCount > 0 && (
            <NumberOfLikes order={3}>
              <strong>{likesCount} likes</strong>
            </NumberOfLikes>
          )}
          {/* {fetchmore } */}

          <CreatedTime order={5}>
            <Link to={`/p/${id}`}>{timeAgo}</Link>
          </CreatedTime>

          <PostAddComment
            handleAddComment={handleAddComment}
            onKeyDown={onKeyDown}
            newComment={newComment}
            order={6}
          />
          <Comments order={4}>
            <Text>
              <Username>
                <Link to={`/${user.username}`}>{user.username}</Link>
              </Username>
              <Caption>
                <span>
                  {caption.length > 200 ? captionArr + " ... " : caption}
                  {caption.length > 200 && <button> see more</button>}
                </span>
              </Caption>
            </Text>
            {comments.map((c) => {
              return null;
            })}
          </Comments>
        </Sections>
      </FeedWrapper>
    );
  }
}

export default PostContainer;
