import { gql, useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import { myUsernameVar } from "../../Apollo/LocalState";
import Avatar from "../../Components/Avatar";
import { useHistory, useLocation } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import { timeSince } from "../../Components/Util";
import { Username } from "../../Styles/Username";
import NewMessageModal from "./NewMessageModal";
export const CHAT_LIST = gql`
  query chatList {
    chatList {
      id
      updatedAt
      participants {
        username
        avatar
      }
      participantsExceptMe {
        username
        avatar
      }
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
    background-color: #efefef;
  }
  cursor: pointer;
`;
export const Name = styled(Username)`
  margin: 13px;
`;
const Updated = styled.div`
  margin-left: auto;
`;
const Header = styled.div`
  padding: 20px;
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
const Chat = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;
const ChatWrapper = styled.div`
  max-height: 883px;
`;

const NewChat = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
`;
const NewChatMessage = styled.div`
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  text-align: center;
  strong {
    font-size: 27px;
    text-transform: capitalize;
    margin-bottom: 8px;
  }
`;
const NewChatButton = styled.button`
  margin: auto;
  display: flex;
  text-transform: capitalize;
  border: 0;
  border-radius: 5px;
  color: white;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  font-weight: 600;
  font-size: 14px;
  vertical-align: center;
  background-color: ${(props) => props.theme.blueColor};
`;
const IconButton = styled.button`
  margin-left: auto;
`;
function DirectContainer() {
  const { pathname } = useLocation();
  const history = useHistory();
  const [chatId, setChatId] = useState("");
  const [modal, setModal] = useState(false);
  const myUsername = useReactiveVar(myUsernameVar);
  const { data, loading } = useQuery(CHAT_LIST);

  useEffect(() => {
    if (pathname.startsWith("/direct/t/")) {
      setChatId(pathname.substr(10));
    }
  }, [pathname]);
  if (!data || loading) return <Loader />;
  else {
    const { chatList } = data;
    return (
      <>
        <NewMessageModal showing={modal} setModal={setModal} />
        <Wrapper>
          <ChatNav>
            <Header>
              header{" "}
              <IconButton
                onClick={() => {
                  setModal(true);
                }}
              >
                new message
              </IconButton>
            </Header>
            <ChatList>
              {chatList.map((chat, index) => {
                let updatedSince = timeSince(chat.updatedAt);
                return (
                  <List
                    key={index}
                    onClick={() => {
                      history.push(`/direct/t/${chat.id}`);
                    }}
                  >
                    {chat.participantsExceptMe.length > 1 ? (
                      chat.participantsExceptMe.map((person, index) => {
                        if (index !== chat.participantsExceptMe.length - 1) {
                          return <Avatar size={30} src={person.avatar} />;
                        } else {
                          return <Avatar size={30} src={person.avatar} />;
                        }
                      })
                    ) : (
                      <Avatar
                        size={56}
                        src={chat.participantsExceptMe[0].avatar}
                      />
                    )}

                    <Name>
                      {chat.participantsExceptMe.map((person, index) => {
                        if (index !== chat.participantsExceptMe.length - 1) {
                          return `${person.username}, `;
                        } else {
                          return `${person.username}`;
                        }
                      })}
                    </Name>
                    <Updated>{updatedSince}</Updated>
                  </List>
                );
              })}
            </ChatList>
          </ChatNav>
          <Chat>
            {pathname.startsWith("/direct/t/") ? (
              <ChatWrapper>
                <ChatRoom chatId={chatId} />
              </ChatWrapper>
            ) : (
              <NewChat>
                <NewChatMessage>
                  <strong>your messages</strong>
                  Send private photos and messages to a friend or group.
                </NewChatMessage>
                <NewChatButton>send Message</NewChatButton>
              </NewChat>
            )}
          </Chat>
        </Wrapper>
      </>
    );
  }
}

export default DirectContainer;
