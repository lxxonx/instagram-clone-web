import React from "react";
import { HashRouter as Router } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import AppRouter from "./Router";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;
const Wrapper = styled.div`
  min-height: 100%;
  margin: 83px auto;
  max-width: 975px;
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
  } = useQuery(QUERY);
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
