import React, { useRef } from "react";
import styled from "styled-components";

const PostPhotoWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  vertical-align: center;
`;
const PostPhoto = styled.img`
  width: 100%;
  height: 100%;
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
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: ${(props) => (props.showing === "true" ? 1 : 0)};
`;

const SlideButtonLeft = styled.button`
  background-color: ${(props) => props.theme.darkGreyColor};
  display: ${(props) => (props.showing ? "block" : "none")};
  color: white;
  font-stretch: ultra-expanded;
  font-weight: 900;
  position: absolute;
  left: 15px;
  border: 0;
  z-index: 2;
  opacity: 0.5;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  :focus {
    outline: none;
  }
  :hover {
    opacity: 1;
  }
`;
const SlideButtonRight = styled.button`
  background-color: ${(props) => props.theme.darkGreyColor};
  display: ${(props) => (props.showing ? "block" : "none")};
  color: white;
  font-weight: 900;
  position: absolute;
  right: 15px;
  border: 0;
  z-index: 2;
  opacity: 0.5;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  :focus {
    outline: none;
  }
  :hover {
    opacity: 1;
  }
`;
function PostPhotos({
  toggleLike,
  photos,
  prevSlide,
  nextSlide,
  currentSlide,
}) {
  const slideButtonLeft = useRef();
  const slideButtonRight = useRef();

  return (
    <PostPhotoWrapper
      onDoubleClick={(e) => {
        if (
          !slideButtonLeft.current.contains(e.target) &&
          !slideButtonRight.current.contains(e.target)
        ) {
          toggleLike();
        }
      }}
    >
      {photos.length > 1 ? (
        <>
          <SlideButtonLeft
            ref={slideButtonLeft}
            onClick={prevSlide}
            showing={currentSlide !== 0}
          >{`<`}</SlideButtonLeft>
          <SlideButtonRight
            ref={slideButtonRight}
            onClick={nextSlide}
            showing={currentSlide < photos.length - 1}
          >{`>`}</SlideButtonRight>
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
  );
}

export default PostPhotos;
