import React from "react";
import styled from "styled-components";

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  display: flex;
  max-width: ${(props) => props.theme.postMaxWidth};
  width: 100%;
  height: 118px;
  align-items: center;
  vertical-align: center;
  margin-bottom: 24px;
  padding: 16px 0;
`;

function FeedStory() {
  return <Box>story</Box>;
}

export default FeedStory;
