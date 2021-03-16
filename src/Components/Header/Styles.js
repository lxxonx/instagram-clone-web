import styled from "styled-components";

export const Menu = styled.div`
  display: ${(props) => {
    return props.showing ? `block` : `none`;
  }};
`;
