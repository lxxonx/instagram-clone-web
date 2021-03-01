import { gql, useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react";
import styled from "styled-components";
import { myUsernameVar } from "../../Apollo/LocalState";
const NEW_MESSAGE = gql`
  subscription newMessage($chatId: String!) {
    newMessage(chatId: $chatId) {
      text
      from {
        username
        avatar
      }
      createdAt
    }
  }
`;
const Chat = styled.div`
  flex: 1 1 auto;
  padding: 20px 20px 0 20px;
  display: flex;
  flex-direction: column-reverse;
  overflow-y: auto;
  height: 100%;
  order: 1;
  height: 745px;
`;
const MyMessage = styled.span`
  margin-top: 10px;
  margin-left: auto;
  max-width: 205px;
  display: flex;
  padding: 15px 20px;
  border-radius: 30px;
  background-color: #efefef;
`;
const Message = styled.span`
  vertical-align: bottom;
  justify-content: end;
  margin-top: 10px;
  margin-right: auto;
  max-width: 205px;
  display: flex;
  padding: 15px 20px;
  border-radius: 30px;
  border: 1px solid #efefef;
`;
function Messages({ data, subscribeToMore, chatId }) {
  const myUsername = useReactiveVar(myUsernameVar);

  useEffect(() => {
    let unsub = subscribeToMore({
      document: NEW_MESSAGE,
      variables: { chatId },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const new_message = subscriptionData.data.newMessage;
        return Object.assign({}, prev, {
          getMessages: [new_message, ...prev.getMessages],
        });
      },
    });
    return () => unsub();
  }, [subscribeToMore, chatId]);
  return (
    <Chat>
      {data?.getMessages?.map((message, index) => {
        if (message.from.username === myUsername) {
          // messages i sent
          return <MyMessage key={index}>{message.text}</MyMessage>;
        } else {
          return <Message key={index}>{message.text}</Message>;
        }
      })}
    </Chat>
  );
}

export default Messages;
