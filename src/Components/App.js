import { gql, useQuery } from "@apollo/client";
import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import AppRouter from "./Router";

const ISLOGGEDIN = gql`
  {
    isLoggedIn @client
  }
`;
const Wrapper = styled.div`
  min-height: 100%;
  margin: auto;
  max-width: 935px;
  padding-top: 55px;
  width: 100%;
`;
const StyledContainer = styled(ToastContainer).attrs({
  // custom props
})`
  .Toastify__toast-container {
  }
  .Toastify__toast {
  }
  .Toastify__toast--error {
    text-align: center;
  }
  .Toastify__toast--warning {
  }
  .Toastify__toast--success {
    text-align: center;
  }
  .Toastify__toast-body {
    white-space: pre-line;
  }
  .Toastify__progress-bar {
  }
`;
const App = () => {
  const {
    data: { isLoggedIn },
  } = useQuery(ISLOGGEDIN);
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <Router>
        <Wrapper>
          <AppRouter isLoggedIn={isLoggedIn} />
        </Wrapper>
      </Router>
      <StyledContainer position={toast.POSITION.TOP_CENTER} />
    </ThemeProvider>
  );
};

export default App;
