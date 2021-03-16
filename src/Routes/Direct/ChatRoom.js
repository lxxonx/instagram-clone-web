import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import styled from "styled-components";
import useInput from "../../Hooks/useInput";
import { CHAT_LIST } from "./DirectContainer";
import Messages from "./Messages";
const GET_MESSAGES = gql`
  query getMessages($chatId: String!, $limit: Int, $offset: Int) {
    getMessages(chatId: $chatId, limit: $limit, offset: $offset) {
      text
      from {
        username
        avatar
      }
      createdAt
    }
  }
`;
const SEND_MESSAGE = gql`
  mutation sendMessage($chatId: String!, $text: String!) {
    sendMessage(chatId: $chatId, text: $text)
  }
`;

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;
const Header = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  vertical-align: center;
  border-bottom: 1px solid #dbdbdb;
  z-index: 3;
`;
const InputWrapper = styled.div`
  border: 1px solid #dbdbdb;
  display: flex;
  flex-direction: row;
  border-radius: 30px;
  margin: 20px;
  flex: 0 0 auto;
  order: 2;
`;
const SendMessage = styled(TextareaAutosize)`
  font-size: 14px;
  line-height: 18px;
  background-color: transparent;
  border: 0;
  padding: 8px 12px;
  width: 100%;
  resize: none;
  :focus {
    outline: none;
  }
`;
const SendButton = styled.button`
  border: 0;
  background-color: transparent;
  padding: 0 12px;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
  :focus {
    outline: none;
  }
  ${(props) => {
    if (props.isEmpty) {
      return `opacity: 0.3;  pointer-events: none;`;
    }
  }};
`;
function ChatRoom({ chatId }) {
  const { data, subscribeToMore, loading } = useQuery(GET_MESSAGES, {
    variables: { chatId },
  });
  const messageInput = useInput();
  const [sendMessage] = useMutation(SEND_MESSAGE, {
    variables: { chatId, text: messageInput.value },
    refetchQueries: [{ query: CHAT_LIST }],
  });
  const onKeyDown = async (e) => {
    const { keyCode } = e;
    if (keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      await sendMessage({
        update: (_, { loading }) => {
          if (!loading) messageInput.setValue("");
        },
      });
    }
  };
  const onClick = async (e) => {
    e.preventDefault();
    await sendMessage({
      update: (_, { loading }) => {
        if (!loading) messageInput.setValue("");
      },
    });
  };
  if (loading || !data) return null;
  else {
    return (
      <>
        <Header></Header>
        <Wrapper>
          <Messages
            data={data}
            subscribeToMore={subscribeToMore}
            chatId={chatId}
          />
          <InputWrapper>
            <SendMessage
              maxRows={3}
              placeholder={"Message..."}
              value={messageInput.value}
              onChange={messageInput.onChange}
              name="message"
              onKeyDown={onKeyDown}
            />
            <SendButton onClick={onClick} isEmpty={messageInput.value === ""}>
              Send
            </SendButton>
          </InputWrapper>
        </Wrapper>
      </>
    );
  }
}

export default ChatRoom;
