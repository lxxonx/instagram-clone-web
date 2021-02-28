import { gql, useQuery, useReactiveVar } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import Loader from "../Components/Loader";
import { myUsernameVar } from "../Apollo/LocalState";
import Avatar from "../Components/Avatar";
import { useHistory } from "react-router-dom";
const CHAT_LIST = gql`
  query chatList {
    chatList {
      id
      participants {
        username
        avatar
      }
      updatedAt
    }
  }
`;

const Wrapper = styled.div`
  ${(props) => props.theme.whiteBox};
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  height: 883px;
`;
const ChatNav = styled.div`
  border-right: 1px solid #dbdbdb;
  width: 350px;
`;
const ChatList = styled.ul`
  margin-top: 8px;
`;
const List = styled.li`
  padding: 8px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 72px;
  :hover {
    background-color: #e6e6e6;
  }
  cursor: pointer;
`;
const Header = styled.div`
  width: 100%;
  height: 60px;
  justify-content: center;
  text-align: center;
  vertical-align: center;
  border-bottom: 1px solid #dbdbdb;
`;
const Chat = styled.div``;
function Direct() {
  const history = useHistory();
  const myUsername = useReactiveVar(myUsernameVar);
  console.log("username: ", myUsername);
  const { data, loading } = useQuery(CHAT_LIST);
  if (!data || loading) return <Loader />;
  else {
    const { chatList } = data;
    const users = [
      ...chatList?.map((chat) => {
        let usersXme = {};
        chat.participants.map((p) => {
          if (p.username !== myUsername) {
            usersXme = { ...usersXme, ...p };
          }
          return null;
        });
        usersXme = { id: chat.id, ...usersXme, ...chat.updatedAt };
        return usersXme;
      }),
    ];
    console.log(users);
    return (
      <Wrapper>
        <ChatNav>
          <Header>header</Header>
          <ChatList>
            {users.map((u, index) => (
              <List
                key={index}
                onClick={() => {
                  history.push(`/direct/t/${u.id}`);
                }}
              >
                <Avatar size={56} src={u.avatar} />
                {u.username}
              </List>
            ))}
          </ChatList>
        </ChatNav>
        <Chat>chat</Chat>
      </Wrapper>
    );
  }
}

export default Direct;
