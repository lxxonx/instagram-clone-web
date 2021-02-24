import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../Components/Avatar";
import Footer from "../Components/Footer";
import Loader from "../Components/Loader";
import { ME } from "../Components/SharedQueries";
import useWidth from "../Hooks/useWidth";
import FeedStory from "./FeedStory";
import Post from "./Post";

const FEED_QUERY = gql`
  query getFeed($limit: Int!, $offset: Int) {
    getFeed(limit: $limit, offset: $offset) {
      id
      caption
      isLiked
      createdAt
      location
      isSaved
      hasMoreComments
      numberOfComments
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
        tagged {
          user {
            username
          }
        }
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
const FeedPage = styled.div`
  max-width: ${(props) => props.theme.postMaxWidth};
  width: 100%;
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
  max-width: 290px;
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
const LinkWrapper = styled(Link)`
  color: black;
`;
function Feed() {
  const [limit, setLimit] = useState(5);
  const [hasMore, setHasMore] = useState(true);
  const { loading, data, fetchMore } = useQuery(FEED_QUERY, {
    variables: { limit, offset: 0 },
    fetchPolicy: "no-cache",
  });
  const { data: meData } = useQuery(ME);
  const width = useWidth();
  // const handleScroll = () => {
  //   const scrollHeight = document.documentElement.scrollHeight;
  //   const scrollTop = document.documentElement.scrollTop;
  //   const clientHeight = document.documentElement.clientHeight;
  //   if (scrollTop + clientHeight >= scrollHeight && loading === false) {
  //   }
  // };
  // useEffect(() => {
  //   // scroll event listener 등록
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     // scroll event listener 해제
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // });
  if (loading || !data || !meData) {
    return <Loader />;
  } else {
    const { getFeed } = data;
    const { me } = meData;
    if (getFeed.length > 5) {
      setHasMore(true);
    }
    return (
      <>
        <Wrapper width={width}>
          <FeedPage width={width}>
            <FeedStory />
            {getFeed.length > 0
              ? getFeed.map((post, index) => {
                  return <Post key={index} id={post.id} />;
                })
              : "There is NO post to show. Let's post something"}
            {hasMore && (
              <button
                onClick={() => {
                  const currentLength = getFeed.length;
                  fetchMore({
                    variables: {
                      offset: currentLength,
                      limit: 5,
                    },
                  }).then(({ data: { getFeed } }) => {
                    // Update variables.limit for the original query to include
                    // the newly added feed items.
                    if (getFeed.length < limit) {
                      setHasMore(false);
                    }
                    setLimit(currentLength + getFeed.length);
                  });
                }}
              >
                load more
              </button>
            )}
          </FeedPage>
          {width < 1000 ? null : (
            <Etc width={width}>
              <Me>
                <LinkWrapper to={`/${me.username}`}>
                  <Avatar src={me.avatar} size={56} />
                </LinkWrapper>
                <MeInfo>
                  <LinkWrapper to={`/${me.username}`}>
                    <MeUsername>{me.username}</MeUsername>
                  </LinkWrapper>
                  <MeName>{me.fullname}</MeName>
                </MeInfo>
              </Me>
              <Footer feed={true} />
            </Etc>
          )}
        </Wrapper>
        <Footer />
      </>
    );
  }
}

export default Feed;
