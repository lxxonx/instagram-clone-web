import React from "react";
import styled from "styled-components";

const Image = styled.img`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  display: flex;
`;

function Spinner({ size = 30 }) {
  return <Image size={size} src="/Images/spinner.png" />;
}

export default Spinner;
