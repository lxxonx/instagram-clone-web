import React from "react";
import { ApolloProvider } from "react-apollo-hooks";
import ReactDOM from "react-dom";
import App from "./Components/App";
import client from "./Apollo/Client";

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
