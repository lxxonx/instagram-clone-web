import React from "react";
import styled, { keyframes } from "styled-components";
import { LOGO } from "./Icons";

const Animation = keyframes`
    0%{
        opacity:0
    }
    50%{
        opacity:1
    }
    100%{
        opacity:0;
    }
`;
const Loading = styled.div`
  animation: ${Animation} 1s linear infinite;
`;
const Loader = () => {
  return (
    <Loading>
      <LOGO size={50} />
    </Loading>
  );
};

export default Loader;
