import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { timeSince } from "../../Components/TimeSince";
import useInput from "../../Hooks/useInput";
import useWidth from "../../Hooks/useWidth";
import FeedPostPresenter from "./FeedPostPresenter";

const LIKE = gql`
  mutation toggleLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;
const ADD_COMMENT = gql`
  mutation addComment($postId: String!, $text: String!) {
    addComment(postId: $postId, text: $text)
  }
`;
const SAVE_POST = gql`
  mutation savePost($postId: String!) {
    savePost(postId: $postId)
  }
`;
const MORE_COMMENTS = gql`
  query getMoreComments($postId: String!, $limit: Int!, $offset: Int!) {
    getMoreComments(postId: $postId, limit: $limit, offset: $offset)
  }
`;
function FeedPostContainer({
  id,
  photos,
  user,
  isLiked,
  isSaved,
  comments,
  createdAt,
  numberOfLikes,
  caption,
}) {
  const newComment = useInput("");
  const [filled, setFilled] = useState(isLiked);
  const [saved, setSaved] = useState(isSaved);
  const [likesCount, setLikesCount] = useState(numberOfLikes);
  const width = useWidth();
  const timeAgo = timeSince(new Date(createdAt * 1));
  const [savePost] = useMutation(SAVE_POST, {
    variables: { postId: id },
    update: ({ loading }) => {
      if (loading) {
      }
      setSaved(!saved);
    },
  });
  const [toggleLike] = useMutation(LIKE, {
    variables: { postId: id },
    update: ({ loading }) => {
      if (loading) {
      }
      filled ? setLikesCount(likesCount - 1) : setLikesCount(likesCount + 1);
      setFilled(!filled);
    },
  });
  const [addComment] = useMutation(ADD_COMMENT, {
    variables: { text: newComment.value, postId: id },
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    newComment.setValue("");
    await addComment();
  };
  const onKeyDown = async (e) => {
    const { keyCode } = e;
    if (keyCode === 13) {
      e.preventDefault();
      newComment.setValue("");
      console.log(keyCode);
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
  return (
    <FeedPostPresenter
      width={width}
      id={id}
      photos={photos}
      user={user}
      filled={filled}
      savePost={savePost}
      saved={saved}
      comments={comments}
      timeAgo={timeAgo}
      likesCount={likesCount}
      toggleLike={toggleLike}
      caption={caption}
      newComment={newComment}
      onSubmit={onSubmit}
      onKeyDown={onKeyDown}
      nextSlide={nextSlide}
      prevSlide={prevSlide}
      currentSlide={currentSlide}
    />
  );
}

FeedPostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      tagged: PropTypes.arrayOf(
        PropTypes.shape({
          user: PropTypes.shape({
            username: PropTypes.string.isRequired,
          }),
        })
      ),
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    amIFollowing: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  isLiked: PropTypes.bool.isRequired,
  isSaved: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
      }),
    })
  ),
  createdAt: PropTypes.string.isRequired,
  numberOfLikes: PropTypes.number.isRequired,
  caption: PropTypes.string.isRequired,
};

export default FeedPostContainer;
