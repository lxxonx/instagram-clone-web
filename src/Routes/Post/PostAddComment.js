import React from "react";
import styled from "styled-components";

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
const InputComment = styled.textarea`
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
function PostAddComment({ handleAddComment, newComment, onKeyDown, order }) {
  return (
    <Wrapper order={order}>
      <AddComment onSubmit={handleAddComment}>
        <InputComment
          value={newComment.value}
          onChange={newComment.onChange}
          onKeyDown={onKeyDown}
        />
        <PostButton text={"post"} isEmpty={newComment.value === ""}>
          post
        </PostButton>
      </AddComment>
    </Wrapper>
  );
}

export default PostAddComment;
