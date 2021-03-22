import React, { useRef } from "react";
import styled from "styled-components";
import { GoPrimitiveDot } from "react-icons/go";
import { useParams } from "react-router";

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
const PhotoIndex = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  justify-content: center;
  display: flex;
`;
const SlideIndex = styled(GoPrimitiveDot)`
  color: ${(props) => {
    return props.showing === "true"
      ? props.theme.bgColor
      : `rgb(255, 255, 255, 0.3)`;
  }};
`;
const SlideButtonLeft = styled.button`
  background-color: white;
  display: ${(props) => (props.showing ? "block" : "none")};
  color: ${(props) => props.theme.darkGreyColor};
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
    opacity: 0.8;
  }
`;
const SlideButtonRight = styled.button`
  background-color: white;
  display: ${(props) => (props.showing ? "block" : "none")};
  color: ${(props) => props.theme.darkGreyColor};
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
    opacity: 0.8;
  }
`;
function PostPhotos({
  toggleLike,
  photos,
  prevSlide,
  nextSlide,
  currentSlide,
}) {
  const { postId } = useParams();
  const slideButtonLeft = useRef();
  const slideButtonRight = useRef();

  return (
    <PostPhotoWrapper>
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
                <PostPhoto
                  onDoubleClick={(e) => {
                    if (
                      !slideButtonLeft.current.contains(e.target) &&
                      !slideButtonRight.current.contains(e.target)
                    ) {
                      toggleLike();
                    }
                  }}
                  src={photo.url}
                  key={photo.id}
                  id={photo.id}
                />
              </PhotoListElement>
            ))}
          </PhotoList>
          {postId && (
            <PhotoIndex>
              {photos.map((photo, index) => (
                <SlideIndex
                  key={index}
                  id={photo.id}
                  showing={`${index === currentSlide}`}
                ></SlideIndex>
              ))}
            </PhotoIndex>
          )}
        </>
      ) : (
        <PostPhoto
          onDoubleClick={() => {
            toggleLike();
          }}
          src={photos[0].url}
          id={photos[0].id}
        />
      )}
    </PostPhotoWrapper>
  );
}

export default PostPhotos;
