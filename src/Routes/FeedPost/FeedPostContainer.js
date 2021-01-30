import React, { useEffect, useRef, useState } from "react";
import FeedPostPresenter from "./FeedPostPresenter";
import PropTypes from "prop-types";
import { gql, useMutation } from "@apollo/client";
import { timeSince } from "../../Components/TimeSince";
import useWidth from "../../Hooks/useWidth";
import useInput from "../../Hooks/useInput";

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
function FeedPostContainer({
  id,
  photos,
  user,
  isLiked,
  comments,
  createdAt,
  numberOfLikes,
  caption,
}) {
  const newComment = useInput("");
  const [filled, setFilled] = useState(isLiked);
  const [likesCount, setLikesCount] = useState(numberOfLikes);
  const width = useWidth();
  const timeAgo = timeSince(new Date(createdAt * 1));
  const [toggleLike] = useMutation(LIKE, {
    variables: { postId: id },
    update: () => {
      filled ? setLikesCount(likesCount - 1) : setLikesCount(likesCount + 1);
      setFilled(!filled);
    },
  });
  const [addComment, { data, loading }] = useMutation(ADD_COMMENT, {
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
  // const slideRef = useRef(null);
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
  // useEffect(() => {
  //   if (slideRef.current) {
  //     slideRef.current.style.transition = "all 0.5s ease-in-out";
  //     slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
  //   }
  // }, [currentSlide]);

  return (
    <FeedPostPresenter
      width={width}
      id={id}
      photos={photos}
      user={user}
      filled={filled}
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
