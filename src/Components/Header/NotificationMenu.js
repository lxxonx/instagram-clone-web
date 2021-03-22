import React from "react";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";

const NOTIFICATION = gql`
  query notification {
    notification {
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
  padding-top: 10px;
`;
const Items = styled.ul``;
const Notification = styled.li`
  height: 68px;
  padding: 12px 16px;
`;
function NotificationMenu({ username }) {
  const { data } = useQuery(NOTIFICATION);
  console.log(data);
  return (
    <Menu>
      <Items>
        {data?.notification.map((notification) => {
          if (notification.newComment) {
            return (
              <Notification>
                {"new comment:  "}
                {notification.newComment.text}
              </Notification>
            );
          } else if (notification.newLike) {
            return (
              <Notification>
                {"new like:  "}
                {notification.newLike.user.username}
              </Notification>
            );
          }
        })}
      </Items>
    </Menu>
  );
}

export default NotificationMenu;
