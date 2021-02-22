import React, { useState } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  EmptyHeartIcon,
  FilledHeartIcon,
  FilledSaveLabel,
  PaperPlaneIconWhite,
  SaveLabel,
  TextBalloon,
} from "../../Components/Icons";

const IconWrapper = styled.section`
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
  cursor: pointer;
  margin-right: 0;
  :focus {
    outline: none;
  }
`;
const PhotoIndex = styled.div`
  margin: auto;
  flex: 1 1 99999px;
  justify-content: center;
  display: flex;
`;
const Icons = styled.div`
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
const SlideIndex = styled(GoPrimitiveDot)`
  color: ${(props) => {
    return props.showing === "true"
      ? props.theme.blueColor
      : props.theme.darkGreyColor;
  }};
`;
function PostIcons({
  isLiked,
  isSaved,
  numberOfLikes,
  toggleLike,
  photos,
  currentSlide,
  savePost,
  filled,
  saved,
}) {
  const { postId } = useParams();
  return (
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
      {!postId && photos.length > 1 ? (
        <PhotoIndex>
          {photos.map((photo, index) => (
            <SlideIndex
              key={index}
              id={photo.id}
              showing={`${index === currentSlide}`}
            ></SlideIndex>
          ))}
        </PhotoIndex>
      ) : null}

      <SaveLableWrapper>
        <IconButtons onClick={savePost}>
          {saved ? <FilledSaveLabel /> : <SaveLabel />}
        </IconButtons>
      </SaveLableWrapper>
    </IconWrapper>
  );
}

export default PostIcons;
