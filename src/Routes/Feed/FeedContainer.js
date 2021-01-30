import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import styled from "styled-components";
import Avatar from "../../Components/Avatar";
import Loader from "../../Components/Loader";
import useMeQuery from "../../Hooks/useMeQuery";
import useWidth from "../../Hooks/useWidth";
import FeedPostContainer from "../FeedPost/FeedPostContainer";
import FeedStory from "../FeedStory";

const FEED_QUERY = gql`
  query getFeed($limit: Int!, $offset: Int) {
    getFeed(limit: $limit, offset: $offset) {
      id
      caption
      isLiked
      createdAt
      location
      comments {
        text
        user {
          username
        }
        createdAt
        id
      }
      likes {
        id
        user {
          username
        }
      }
      photos {
        id
        url
      }
      numberOfLikes
      user {
        avatar
        amIFollowing
        username
      }
    }
  }
`;

const Wrapper = styled.section`
  padding-top: ${(props) => {
    if (props.width < 640) {
      return `0;`;
    } else {
      return `30px;`;
    }
  }};
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  vertical-align: top;
`;
const Feed = styled.div`
  display: flex;
  flex-direction: column;
  ${(props) => {
    if (props.width < 1000) {
      return `margin:auto;`;
    } else {
      return `margin-right: 28px;`;
    }
  }}
`;
const Etc = styled.div`
  ${(props) => props.theme.whiteBox};
  background-color: ${(props) => props.theme.bgColor};
  border: 0;
  position: fixed;
  left: ${(props) => props.width / 2 + 170}px;
  top: 88px;
`;
const Me = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  vertical-align: center;
  align-items: center;
`;
const MeInfo = styled.div`
  margin-left: 20px;
  display: flex;
  flex-direction: column;
`;
const MeUsername = styled.div`
  font-weight: 600;
  font-size: 16px;
`;
const MeName = styled.div`
  font-size: 18px;
  color: ${(props) => props.theme.darkGreyColor};
  font-weight: 300;
`;

function FeedContainer() {
  const [limit, setLimit] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const { loading, data, fetchMore } = useQuery(FEED_QUERY, {
    variables: { limit, offset: 0 },
  });
  const { data: meData } = useMeQuery();
  const width = useWidth();
  return (
    <Wrapper width={width}>
      {!loading && data ? (
        <>
          <Feed width={width}>
            <FeedStory />
            {data.getFeed.map((post, index) => {
              return (
                <FeedPostContainer
                  key={index}
                  id={post.id}
                  photos={post.photos}
                  user={post.user}
                  isLiked={post.isLiked}
                  comments={post.comments}
                  createdAt={post.createdAt}
                  numberOfLikes={post.numberOfLikes}
                  caption={post.caption}
                />
              );
            })}
            {hasMore && (
              <button
                onClick={() => {
                  const currentLength = data.getFeed.length;
                  fetchMore({
                    variables: {
                      offset: currentLength,
                      limit: 5,
                    },
                  }).then(({ data }) => {
                    // Update variables.limit for the original query to include
                    // the newly added feed items.
                    if (data.getFeed.length < limit) {
                      setHasMore(false);
                    }
                    setLimit(currentLength + data.getFeed.length);
                  });
                }}
              >
                load more
              </button>
            )}
          </Feed>
          {width < 1000 ? null : (
            <Etc width={width}>
              <Me>
                <Avatar src={meData.me.avatar} size={56} />
                <MeInfo>
                  <MeUsername>{meData.me.username}</MeUsername>
                  <MeName>{meData.me.fullname}</MeName>
                </MeInfo>
              </Me>
            </Etc>
          )}
        </>
      ) : (
        <Loader />
      )}
    </Wrapper>
  );
}

export default FeedContainer;
