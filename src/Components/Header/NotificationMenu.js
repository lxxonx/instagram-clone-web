import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { gql, useMutation, useQuery } from "@apollo/client";
import Avatar from "../Avatar";
import { Link, useHistory } from "react-router-dom";
import { timeSince } from "../Util";
import { FOLLOW, UNFOLLOW } from "../../Routes/Profile/ProfileHeader";
import ToggleFollow from "../ToggleFollow";

const NEW_NOTIFICATION = gql`
  subscription newNotification {
    newNotification {
      id
      newComment {
        text
        user {
          username
          avatar
        }
        post {
          id
          photos {
            url
          }
        }
      }
      newLike {
        user {
          username
          avatar
        }
        post {
          id
          photos {
            url
          }
        }
      }
      createdAt
    }
  }
`;
const Menu = styled.div`
  position: absolute;
  top: 150%;
  left: -40%;
  z-index: 3;
  width: 500px;
  height: 370px;
  border-radius: 6px;
  box-shadow: 0 0 5px 1px rgba(var(--jb7, 0, 0, 0), 0.0975);
  transition: opacity 75ms linear, transform 38ms ease-out,
    -webkit-transform 38ms ease-out;
  transform-origin: top center;
  align-items: stretch;
  background-color: white;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 10px;
`;
const Items = styled.ul`
  display: flex;
  flex-direction: column;
`;
const Notification = styled.li`
  display: flex;
  height: 68px;
  padding: 9px 16px;
  align-items: center;
`;
const Content = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
const Username = styled.span`
  margin-right: 6px;
  font-size: 15px;
  font-weight: 600;
  padding-left: 5px;
  margin-left: -5px;
`;
const Text = styled.div`
  padding: 0 12px;
  width: 340px;
  font-size: 14px;
  display: block;
  overflow: hidden;
  text-align: left;
  b {
    padding: 0 5px;
    color: gray;
    font-size: 13px;
  }
  strong {
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;
const PostImg = styled.img`
  width: 44px;
  height: 44px;
  display: flex;
  margin-left: auto;
`;
const FollowButton = styled.button`
  background-color: ${(props) => props.theme.blueColor};
  color: white;
  padding: 7px 4px;
  border-radius: 5px;
  display: flex;
  margin-left: auto;
  border: 0;
  font-size: 9px;
  text-transform: uppercase
    ${(props) =>
      props.loading === "true"
        ? `  opacity: .5;
`
        : null};
`;

function NotificationMenu({ notification, subscribeToMore }) {
  const history = useHistory();
  useEffect(() => {
    let unsub = subscribeToMore({
      document: NEW_NOTIFICATION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const new_notification = subscriptionData.data.newNotification;
        return Object.assign({}, prev, {
          notification: [new_notification, ...prev.notification],
        });
      },
    });
    return () => unsub();
  }, [subscribeToMore]);
  return (
    <Menu>
      <Items>
        {notification.map((n, index) => {
          const ago = timeSince(n.createdAt);
          let body;
          if (n.newComment) {
            body = (
              <Link to={`/p/${n.newComment.post.id}`} key={index}>
                <Notification>
                  <Avatar src={n.newComment.user.avatar} size={44} />
                  <Content>
                    <Text>
                      <Username
                        onClick={() => {
                          history.push(`/${n.newComment.user.username}`);
                        }}
                      >
                        {n.newComment.user.username}
                      </Username>
                      <strong>{`left a new comment: ${
                        n.newComment.text.length > 100
                          ? n.newComment.text.slice(0, 100) + "..."
                          : n.newComment.text
                      }`}</strong>
                      <b>{ago}</b>
                    </Text>
                  </Content>
                  <PostImg src={n.newComment.post.photos[0].url} />
                </Notification>
              </Link>
            );
          } else if (n.newLike) {
            body = (
              <Link to={`/p/${n.newLike.post.id}`} key={index}>
                <Notification>
                  <Avatar src={n.newLike.user.avatar} size={44} />
                  <Content>
                    <Text>
                      <Username
                        onClick={() => {
                          history.push(`/${n.newLike.user.username}`);
                        }}
                      >
                        {n.newLike.user.username}{" "}
                      </Username>
                      <strong>{"liked your post"}</strong>
                      <b>{ago}</b>
                    </Text>
                  </Content>
                  <PostImg src={n.newLike.post.photos[0].url} />
                </Notification>
              </Link>
            );
          } else if (n.newFollower) {
            body = (
              <Notification key={index}>
                <Avatar src={n.newFollower.avatar} size={44} />
                <Content>
                  <Text>
                    <Username
                      onClick={() => {
                        history.push(`/${n.newFollower.username}`);
                      }}
                    >
                      {n.newFollower.username}
                    </Username>
                    <strong>{"started following you"}</strong>
                    <b>{ago}</b>
                  </Text>
                </Content>
                <ToggleFollow username={n.newFollower.username} />
              </Notification>
            );
          }
          return body;
        })}
      </Items>
    </Menu>
  );
}

export default NotificationMenu;
