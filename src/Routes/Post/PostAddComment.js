import { useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ADD_COMMENT, GET_COMMENT } from "../../Components/SharedQueries";
import TextareaAutosize from "react-textarea-autosize";

const Wrapper = styled.section`
  bottom: 0;
  margin-top: 8px;
  border-top: 1px solid rgba(239, 239, 239, 1);
  order: ${(props) => props.order};
  align-items: stretch;
  box-sizing: border-box;
  display: flex;
  position: relative;
  flex-shrink: 0;
  font-size: 14px;
`;
const AddComment = styled.form`
  padding: 0 16px;
  border: 0;
  width: 100%;
  height: 50px;
  display: flex;
  vertical-align: center;
  align-items: center;
`;
const InputComment = styled(TextareaAutosize)`
  width: 100%;
  font-size: 14px;
  height: 20px;
  border: 0;
  resize: none;
  overflow: hidden;
  &:focus {
    outline: none;
  }
`;
const PostButton = styled.button`
  border: 0;
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: white;
  height: 35px;
  font-size: 15px;
  padding: 0;
  color: ${(props) => props.theme.blueColor};
  text-align: center;
  font-weight: 600;
  text-transform: capitalize;
  ${(props) => {
    if (props.isEmpty) {
      return `opacity: 0.3;  pointer-events: none;`;
    }
  }};
  :focus {
    outline: none;
  }
`;
function PostAddComment({ order, id }) {
  const { register, watch, handleSubmit, setValue, control } = useForm();
  const text = watch("text");
  const [addComment] = useMutation(ADD_COMMENT, {
    variables: { text, postId: id },
    refetchQueries: [{ query: GET_COMMENT, variables: { postId: id } }],
  });

  const handleAddComment = async (e) => {
    await addComment();
    setValue("text", "");
  };

  const onKeyDown = async (e) => {
    const { keyCode } = e;
    if (keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      await addComment();
      setValue("text", "");
    }
  };
  useEffect(() => {
    if (watch("text").includes("@")) {
      console.log("@");
    }
  }, [watch()]);
  return (
    <Wrapper order={order}>
      <AddComment onSubmit={handleSubmit(handleAddComment)}>
        <InputComment
          ref={register}
          name="text"
          maxRows={3}
          onKeyDown={onKeyDown}
        />
        <PostButton
          ref={register}
          name="button"
          text={"post"}
          isEmpty={text === "" || text === undefined}
        >
          post
        </PostButton>
      </AddComment>
    </Wrapper>
  );
}

export default PostAddComment;
