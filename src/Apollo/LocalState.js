import { InMemoryCache, makeVar } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
export const isLoggedInVar = makeVar(
  localStorage.getItem("token") === null ? false : true
);
export const myUsernameVar = makeVar("");
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        // isLoggedIn() {
        //   return localStorage.getItem("token") === null ? false : true;
        // },
        getFeed: offsetLimitPagination(),
        getProfilePost: offsetLimitPagination(),
        // {
        //   read(existing, { args: { offset, limit } }) {
        //     return existing && existing.slice(offset, offset + limit);
        //   },
        //   keyArgs: [],
        //   merge(existing, incoming, { args: { offset = 0 } }) {
        //     const merged = existing ? existing.slice(0) : [];
        //     for (let i = 0; i < incoming.length; ++i) {
        //       merged[offset + i] = incoming[i];
        //     }
        //     return merged;
        //   },
        // },
        getMoreComments: {
          keyArgs: false,
          comments: {
            // The keyArgs list and merge function are the same as above.

            merge(existing, incoming, { args: { offset = 0 } }) {
              console.log(existing);
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[offset + i] = incoming[i];
              }
              return merged;
            },
          },
        },
        getMessages: {
          merge(existing, incoming, { args: { offset = 0 } }) {
            // Slicing is necessary because the existing data is
            // immutable, and frozen in development.
            const merged = existing ? existing.slice(0) : [];
            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i];
            }
            return merged;
          },
        },
      },
    },

    // Post: {
    //   fields: {
    //     comments: {
    //       keyArgs: [],

    //       merge(existing, incoming, { args: { offset = 0 } }) {
    //         const merged = existing ? existing.slice(0) : [];
    //         for (let i = 0; i < incoming.length; ++i) {
    //           merged[offset + i] = incoming[i];
    //         }
    //         return merged;
    //       },
    //     },
    //   },
    // },
    User: {
      merge: true,
    },
  },
});

export const resolvers = {
  Mutation: {
    logUserIn: async (_, { token }, { cache }) => {
      localStorage.setItem("token", token);
      // const query = gql`
      //   {
      //     isLoggedIn @client
      //   }
      // `;
      // console.log("before: ", await cache.readQuery({ query }));
      // cache.writeQuery({
      //   query,
      //   data: {
      //     isLoggedIn: true,
      //   },
      // });
      // console.log("after: ", await cache.readQuery({ query }));
      isLoggedInVar(true);
      window.location.reload("/");
      return null;
    },
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem("token");
      // cache.writeQuery({
      //   query: gql`
      //     query isLoggedIn {
      //       isLoggedIn
      //     }
      //   `,
      //   data: {
      //     isLoggedIn: false,
      //   },
      // });
      // redirect/ reopen the window
      isLoggedInVar(false);
      window.location.reload("/");
      return null;
    },
  },
};
