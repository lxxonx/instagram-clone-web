import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Router from "./Router";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;
const Wrapper = styled.div`
  min-height: 100%;
  margin: 0 auto 0px;
  max-width: 935px;
  width: 100%;
`;

const App = () => {
  const {
    data: { isLoggedIn },
  } = useQuery(QUERY);
  return (
    <ThemeProvider theme={Theme}>
      <Wrapper>
        <GlobalStyles />
        <Router isLoggedIn={isLoggedIn} />
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
