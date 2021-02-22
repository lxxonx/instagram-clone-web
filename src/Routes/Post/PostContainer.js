import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ADD_COMMENT, LIKE, SAVE_POST } from "../../Components/SharedQueries";
import { timeSince } from "../../Components/Util";
import useInput from "../../Hooks/useInput";
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
const Photos = styled.div`
  width: 600px;
  height: 600px;
`;
const Sections = styled.div`
  width: 335px;
`;
const CreatedTime = styled.section`
  color: ${(props) => props.theme.darkGreyColor};
  font-size: 10px;
  margin: 0px 16px;
  text-transform: uppercase;
  :hover {
    span {
      visibility: visible;
    }
  }
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
  font-size: 16px;
  margin-bottom: 10px;
  strong {
    font-weight: 600;
  }
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
}) {
  const { postId } = useParams();
  const newComment = useInput("");
  const [likesCount, setLikesCount] = useState(numberOfLikes);
  const [filled, setFilled] = useState(isLiked);
  const [saved, setSaved] = useState(isSaved);
  const timeAgo = timeSince(new Date(createdAt * 1));
  const createdDate = new Date(createdAt * 1).toString();
  // const width = useWidth();
  console.log(createdDate);
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
        <Sections>
          <PostHeader
            username={user.username}
            avatar={user.avatar}
            amIFollowing={user.amIFollowing}
            isSelf={user.isSelf}
          />
          <PostIcons
            isLiked={isLiked}
            isSaved={isSaved}
            filled={filled}
            saved={saved}
            numberOfLikes={numberOfLikes}
            toggleLike={toggleLike}
            photos={photos}
            currentSlide={currentSlide}
            savePost={savePost}
          />
          <NumberOfLikes>
            <strong>{likesCount} likes</strong>
          </NumberOfLikes>
          <CreatedTime>
            {timeAgo} Ago<CreatedDate>{createdDate}</CreatedDate>
          </CreatedTime>
          <PostAddComment
            handleAddComment={handleAddComment}
            newComment={newComment}
            onKeyDown={onKeyDown}
          />
        </Sections>
      </Wrapper>
    );
  } else {
    return null;
    // return (
    //   <Post width={width}>
    //     <PostHeader username={user.username} avatar={user.avatar} />

    //     <PostIcons
    //       order={order}
    //       isLiked={isLiked}
    //       isSaved={isSaved}
    //       numberOfLikes={numberOfLikes}
    //       toggleLike={toggleLike}
    //       photos={photos}
    //       currentSlide={currentSlide}
    //       savePost={savePost}
    //     />
    //     <TextWrapper>
    //       <NumberOfLikes>좋아요 {likesCount}개</NumberOfLikes>

    //       <UserText>
    //         <Username to={`/${user.username}`}>{user.username}</Username>
    //         <Text>{caption}</Text>
    //       </UserText>
    //       {/* {fetchmore } */}
    //       <CommentsWrapper>
    //         <Link to={`/p/${id}`}>get more comments</Link>
    //         {comments.map((comment) => {
    //           return (
    //             <UserText key={comment.id}>
    //               <Username to={`/${comment.user.username}`}>
    //                 {comment.user.username}
    //               </Username>
    //               <Text>{comment.text}</Text>
    //             </UserText>
    //           );
    //         })}
    //       </CommentsWrapper>
    //       <CreatedTime>{timeAgo} Ago</CreatedTime>
    //     </TextWrapper>
    //     <PostAddComment
    //       handleAddComment={handleAddComment}
    //       onKeyDown={onKeyDown}
    //       newComment={newComment}
    //     />
    //   </Post>
    // );
  }
}

export default PostContainer;
