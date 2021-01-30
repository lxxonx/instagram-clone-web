// if you have a lot of UI
// menu open/close etc...

import { gql, InMemoryCache } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn() {
          return localStorage.getItem("token") === null ? false : true;
        },
        getFeed: offsetLimitPagination(),
        getProfilePost: {
          read(existing, { args: { offset, limit } }) {
            return existing && existing.slice(offset, offset + limit);
          },
          keyArgs: [],
          merge(existing, incoming, { args: { offset = 0 } }) {
            const merged = existing ? existing.slice(0) : [];
            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i];
            }
            return merged;
          },
        },
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
