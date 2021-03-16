import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
const CREATE_POST = gql`
  mutation createPost(
    $location: String
    $caption: String
    $photos: [Upload!]!
  ) {
    createPost(location: $location, caption: $caption, photos: $photos) {
      id
    }
  }
`;
const Wrapper = styled.div`
  ${(props) => props.theme.whiteBox};
  margin-top: 40px;
  display: flex;
  flex-direction: row;
`;
const Input = styled.input`
  padding: 16px;
  height: 2em;
  border: 0;
  width: 100%;
`;
const Caption = styled.textarea`
  padding: 16px;
  border: 0;
  width: 100%;
`;
const PostButton = styled.button`
  width: 100px;
  margin-right: 0;
`;
const File = styled.input`
  border: 0;
  margin: auto;
  display: ${(props) => (props.showing ? "block" : "none")};
`;
const Photo = styled.div`
  width: 600px;
  height: 600px;
  overflow: hidden;
  position: absolute;
  flex-direction: row;
  object-fit: cover;
  box-sizing: border-box;
  display: ${(props) => (props.showing ? "flex" : "none")};
  border: 0;
  cursor: pointer;
`;
const PostPhoto = styled.img`
  width: 100%;
  height: 100%;
  overflow: hidden;
  flex-direction: row;
  object-fit: cover;
  box-sizing: border-box;
  display: flex;
  border: 0;
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
const Preview = styled.div`
  width: 600px;
  height: 600px;
  overflow: hidden;
  display: flex;
`;
const Form = styled.form`
  max-width: 335px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
function CreatePost() {
  const history = useHistory();

  const { register, watch, handleSubmit } = useForm();

  const preview = useRef();
  const inputFile = useRef();
  const prevSlidsButton = useRef();
  const nextSlidsButton = useRef();

  const [showing, setShowing] = useState(false);

  const [length, setLength] = useState(1);
  const [previews, setPreviews] = useState([]);

  const TOTAL_SLIDES = length;
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

  const [createPost] = useMutation(CREATE_POST, {
    variables: {
      location: watch("location"),
      caption: watch("caption"),
      photos: watch("file"),
    },
  });

  const handleFile = ({ target }) => {
    if (target.files.length <= 1) {
      let reader = new FileReader();
      reader.onload = (e) => {
        preview.current.src = e.target.result;
      };
      reader.readAsDataURL(target.files[0]);
    } else {
      setLength(target.files.length);
      for (let i = 0; i < target.files.length; i++) {
        let reader = new FileReader();
        reader.onload = (e) => {
          setPreviews((olds) => [...olds, e.target.result]);
        };
        reader.readAsDataURL(target.files[i]);
      }
    }
    setShowing(true);
  };
  const onSubmit = async (e) => {
    let postId;
    await createPost({
      update: (_, { data, loading, errors }) => {
        if (errors) console.log(errors);
        if (!loading) {
          postId = data.createPost.id;
          history.push(`/p/${postId}`);
        }
      },
    });
  };

  useEffect(() => {
    if (inputFile.current) {
      register(inputFile.current, { required: true });
    }
  }, [register]);
  return (
    <Wrapper>
      <Preview>
        <Photo
          showing={showing}
          onClick={(e) => {
            if (watch("file")?.length > 1) {
              if (
                !prevSlidsButton.current.contains(e.target) &&
                !nextSlidsButton.current.contains(e.target)
              )
                inputFile.current.click();
            } else {
              inputFile.current.click();
            }
          }}
        >
          {watch("file")?.length > 1 ? (
            <>
              <SlideButtonLeft
                ref={prevSlidsButton}
                onClick={prevSlide}
                showing={currentSlide !== 0}
              >{`<`}</SlideButtonLeft>
              <SlideButtonRight
                ref={nextSlidsButton}
                onClick={nextSlide}
                showing={currentSlide < length - 1}
              >{`>`}</SlideButtonRight>
              <PhotoList>
                {previews.map((p, index) => (
                  <PhotoListElement
                    showing={`${index === currentSlide}`}
                    key={index}
                  >
                    <PostPhoto src={p} />
                  </PhotoListElement>
                ))}
              </PhotoList>
            </>
          ) : (
            <PostPhoto ref={preview} />
          )}
        </Photo>
        <File
          type="file"
          multiple
          ref={inputFile}
          onChange={handleFile}
          accept="image/*"
          showing={!showing}
          name="file"
        />
      </Preview>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* 
        disable button when its uploading
        and let them know its uploading
        */}
        <PostButton>post</PostButton>
        <Input placeholder={"location"} ref={register} name="location" />
        <Caption placeholder={"caption"} ref={register} name="caption" />
      </Form>
    </Wrapper>
  );
}

export default CreatePost;
