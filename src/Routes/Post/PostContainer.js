import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../../Components/Avatar";
import { LIKE } from "../../Components/SharedQueries";
import { full_date, timeSince } from "../../Components/Util";
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
  display: table;
`;
const Photos = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-width: 598px;
  display: table-row;
`;
const FeedPhotos = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  max-width: 614px;
`;
const Sections = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  ${(props) => (props.maxWidth ? `max-width: ${props.maxWidth}px;` : null)};
  max-height: 598px;
`;
const AvatarWrapper = styled.div`
  margin-right: 14px;
`;
const GrayText = styled.section`
  display: flex;
  color: ${(props) => props.theme.darkGreyColor};
  font-size: ${(props) => props.font_size};
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
  ${(props) => (props.order ? `order: ${props.order}` : `margin-bottom: 3px`)};
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
  ${(props) => (props.order === 2 ? `padding: 16px;` : null)};
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  flex-direction: column;
  height: 100%;
`;
const Comment = styled.div`
  display: flex;
  flex-direction: row;
  vertical-align: center;
  padding-bottom: 16px;
`;
const CommentsText = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;
const Text = styled.div`
  padding: 0;
  line-height: 1.3em;
  display: block;
  position: relative;
`;
const Username = styled.span`
  margin-right: 6px;
  a {
    font-size: 15px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 5px;
    margin-left: -5px;
  }
`;
const TextCreated = styled.div`
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 10px;
  margin-top: 5px;
  text-transform: uppercase;
`;
const Caption = styled.span`
  vertical-align: baseline;
  overflow-inline: inherit;
  overflow-wrap: anywhere;
  margin-right: 5px;
  span {
    white-space: pre-wrap;
  }
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
  numberOfComments,
  comments,
  fetchMoreComments,
}) {
  const { postId } = useParams();
  const [likesCount, setLikesCount] = useState(numberOfLikes);
  const [liked, setLiked] = useState(isLiked);
  const [newComments] = useState([]);
  const [newCommentAdded, setNewCommentAdded] = useState(false);
  const timeAgo = timeSince(createdAt);
  const createdDate = full_date(createdAt);
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
  useEffect(() => {
    if (newCommentAdded) {
      setNewCommentAdded(false);
    }
  }, [newCommentAdded, newComments]);
  if (postId) {
    return (
      <Wrapper>
        <Helmet>
          <title>
            {caption === ""
              ? `Instagram photo by ${
                  user.fullname ? user.fullname : `@${user.username}`
                }`
              : user.fullname
              ? `${user.fullname} on Instagram: ${caption}`
              : `@${user.username}`}
          </title>
        </Helmet>
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
            id={id}
          />
          <Divider />
          <Comments order={2}>
            {caption !== "" && (
              <Comment>
                <AvatarWrapper>
                  <Avatar src={user.avatar} size={38} />
                </AvatarWrapper>
                <TextWrapper>
                  <Text>
                    <Username>
                      <Link to={`/${user.username}`}>{user.username}</Link>
                    </Username>
                    <Caption>
                      <span>{caption}</span>
                    </Caption>
                  </Text>
                  <TextCreated> {timeAgo}</TextCreated>
                </TextWrapper>
              </Comment>
            )}
            {comments.hasMore ? (
              <button
                onClick={() => {
                  fetchMoreComments({
                    variables: {
                      cursor: comments.cursor,
                    },
                  });
                }}
              >
                +
              </button>
            ) : null}
            <CommentsText>
              {comments.comments.map((comment, index) => {
                return (
                  <Comment key={index}>
                    <AvatarWrapper>
                      <Avatar src={comment.user.avatar} size={38} />
                    </AvatarWrapper>
                    <Text>
                      <Username>
                        <Link to={`/${comment.user.username}`}>
                          {comment.user.username}
                        </Link>
                      </Username>
                      <Caption>
                        <span>{comment.text}</span>
                      </Caption>
                      <TextCreated>
                        {timeSince(new Date(comment.createdAt * 1))}
                      </TextCreated>
                    </Text>
                  </Comment>
                );
              })}
            </CommentsText>

            {newComments.map((comment, index) => {
              return (
                <Comment key={index}>
                  <AvatarWrapper>
                    <Avatar src={comment.user.avatar} size={38} />
                  </AvatarWrapper>
                  <Text>
                    <Username>
                      <Link to={`/${comment.user.username}`}>
                        {comment.user.username}
                      </Link>
                    </Username>
                    <Caption>
                      <span>{comment.text}</span>
                    </Caption>
                    <TextCreated>
                      {timeSince(new Date(comment.createdAt * 1))}
                    </TextCreated>
                  </Text>
                </Comment>
              );
            })}
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
          <GrayText order={5}>{createdDate}</GrayText>
          <PostAddComment
            order={6}
            id={id}
            newComments={newComments}
            setNewCommentAdded={setNewCommentAdded}
          />
        </Sections>
      </Wrapper>
    );
  } else {
    return (
      <FeedWrapper>
        <PostHeader
          username={user.username}
          avatar={user.avatar}
          isSelf={user.isSelf}
          location={location}
          id={id}
        />

        <FeedPhotos>
          <PostPhotos
            toggleLike={toggleLike}
            photos={photos}
            prevSlide={prevSlide}
            nextSlide={nextSlide}
            currentSlide={currentSlide}
          />
        </FeedPhotos>
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

          <GrayText order={5} font_size={"10px"}>
            <Link to={`/p/${id}`}>{timeAgo} ago</Link>
          </GrayText>

          <PostAddComment
            order={6}
            id={id}
            newComments={newComments}
            setNewCommentAdded={setNewCommentAdded}
          />
          <Comments order={4}>
            <Text>
              <Username>
                <Link to={`/${user.username}`}>{user.username}</Link>
              </Username>
              <Caption>
                <span>
                  {caption.length > 200 ? captionArr + " ... " : caption}
                  {caption.length > 200 && <button>see more</button>}
                </span>
              </Caption>
            </Text>
            {numberOfComments > 2 && (
              <GrayText font_size={"14px"}>
                <Link to={`/p/${id}`}>see all {numberOfComments} comments</Link>
              </GrayText>
            )}
            {comments.comments.slice(0, 2).map((c, index) => {
              return (
                <Text key={index}>
                  <Username>
                    <Link to={`/${c.user.username}`}>{c.user.username}</Link>
                  </Username>
                  <Caption>
                    <span>{c.text}</span>
                  </Caption>
                </Text>
              );
            })}
            {newComments.map((comment, index) => {
              return (
                <Text key={index}>
                  <Username>
                    <Link to={`/${comment.user.username}`}>
                      {comment.user.username}
                    </Link>
                  </Username>
                  <Caption>
                    <span>{comment.text}</span>
                  </Caption>
                </Text>
              );
            })}
          </Comments>
        </Sections>
      </FeedWrapper>
    );
  }
}

export default PostContainer;
