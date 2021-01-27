// import ApolloClient from "apollo-boost";
import { ApolloClient } from "@apollo/client";
import { resolvers, cache } from "./LocalState";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  resolvers,
  cache,
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
export default client;
