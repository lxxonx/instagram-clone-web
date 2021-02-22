import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 30px 0 20px;
`;

export const Posts = styled.article`
  display: flex;
  justify-content: space-between;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
`;
export const PostWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 293px);
  grid-template-rows: 293px;
  grid-auto-rows: 293px;
  grid-gap: 28px;
  img {
    max-width: 293px;
  }
`;
