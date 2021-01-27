// if you have a lot of UI
// menu open/close etc...

import { gql, InMemoryCache } from "@apollo/client";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          return localStorage.getItem("token") === null ? false : true;
        },
        // getFeed: {
        //   keyArgs: [offset, limit],
        //   merge(existing = [], incoming) {
        //     return [...existing, ...incoming];
        //   },
        // },
      },
    },
  },
});

export const resolvers = {
  Mutation: {
    logUserIn: async (_, { token }, { cache }) => {
      localStorage.setItem("token", token);
      const query = gql`
        {
          isLoggedIn @client
        }
      `;
      // console.log("before: ", await cache.readQuery({ query }));
      cache.writeQuery({
        query,
        data: {
          isLoggedIn: true,
        },
      });
      // console.log("after: ", await cache.readQuery({ query }));
      window.location.reload("/");
      return null;
    },
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem("token");
      cache.writeQuery({
        query: gql`
          query isLoggedIn {
            isLoggedIn
          }
        `,
        data: {
          isLoggedIn: false,
        },
      });
      // redirect/ reopen the window
      window.location.reload("/");
      return null;
    },
  },
};
