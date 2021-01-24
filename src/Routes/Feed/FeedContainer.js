import React, { useEffect, useRef, useState } from "react";
import FeedStory from "./FeedStory";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { Link, useParams } from "react-router-dom";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import Loader from "../../Components/Loader";

const FEED_QUERY = gql`
  query getFeed {
    getFeed {
      caption
      isLiked
      createdAt
      location
      likes {
        id
      }
      photos {
        id
        url
      }
      numberOfLikes
      user {
        avatar
        amIFollowing
        username
      }
    }
  }
`;

const Post = styled.article`
  ${(props) => props.theme.whiteBox}
  max-width: ${(props) => props.theme.postMaxWidth};
  width: 100%;
  align-items: center;
  vertical-align: center;
  margin-bottom: 60px;
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
const OwnerAvaCan = styled.canvas`
  height: 42px;
  width: 42px;
`;

const OwnerAva = styled(Link)`
  height: 42px;
  width: 42px;
`;
const OwnerName = styled(Link)`
  color: ${(props) => props.theme.blackColor};
  padding: 5px;
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
const PostPhotoWrapper = styled.div`
  display: flex;
`;
const Wrapper = styled.div`
  max-width: ${(props) => props.theme.postMaxWidth};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
function FeedPost({ post }) {
  const TOTAL_SLIDES = post.photos.length;
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);
  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = "all 0.5s ease-in-out";
      slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
    }
  }, [currentSlide]);
  return (
    <Post>
      <PostHeader>
        <PostOwner>
          <OwnerAva to={post.user.username}>
            {post.user.avatar ? "this is avatar" : "null"}
          </OwnerAva>
          <OwnerName to={post.user.username}>{post.user.username}</OwnerName>
        </PostOwner>
        <PostMenu>
          <BiDotsHorizontalRounded />
        </PostMenu>
      </PostHeader>
      <PostPhotoWrapper>
        {post.photos.map((photo) => (
          <PostPhoto src={photo.url} />
        ))}
      </PostPhotoWrapper>
    </Post>
  );
}
function FeedContainer() {
  const { loading, data } = useQuery(FEED_QUERY);

  return (
    <Wrapper>
      {loading ? (
        <Loader />
      ) : (
        <>
          <FeedStory />
          {data.getFeed.map((post) => (
            <FeedPost post={post} key={post.id} />
          ))}
        </>
      )}
    </Wrapper>
  );
}

export default FeedContainer;
