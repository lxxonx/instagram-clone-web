import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import useInput from "../Hooks/useInput";

const CREATE_POST = gql`
  mutation createPost(
    $location: String
    $caption: String
    $photos: [Upload!]!
  ) {
    createPost(location: $location, caption: $caption, photos: $photos) {
      post {
        id
      }
    }
  }
`;

const Input = styled.input`
  border: 0;
`;
function CreatePost() {
  const location = useInput();
  const caption = useInput();
  const [files, setFiles] = useState(null);
  const [createPost] = useMutation(CREATE_POST, {
    variables: {
      location: location.value,
      caption: caption.value,
      files,
    },
  });

  const handleFile = ({ target }) => {
    setFiles(target.files);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(files);
  };
  return (
    <>
      <div>create Post</div>

      <form onSubmit={onSubmit}>
        <input type="file" multiple onChange={handleFile} />
        <button>post</button>
        <Input
          placeholder={"caption"}
          value={caption.value}
          onChange={caption.onChange}
        />
        <Input
          placeholder={"location"}
          value={location.value}
          onChange={location.onChange}
        />
      </form>
    </>
  );
}

export default CreatePost;
