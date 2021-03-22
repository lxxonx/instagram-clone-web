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
        getFeed: {
          merge(existing, incoming) {
            if (incoming.cursor === existing?.cursor) {
              return existing;
            }

            const merged = existing !== undefined ? existing.feed.slice(0) : [];
            let offset = merged.length;
            for (let i = 0; i < incoming.feed.length; ++i) {
              merged[offset + i] = incoming.feed[i];
            }
            const result = {
              cursor: incoming.cursor,
              hasMore: incoming.hasMore,
              feed: merged,
            };
            return result;
          },

          read(existing) {
            if (existing) {
              return {
                cursor: existing.cursor,
                hasMore: existing.hasMore,
                feed: Object.values(existing.feed),
              };
            }
          },
        },
        getProfilePost: offsetLimitPagination(),

        getMoreComments: {
          keyArgs: ["postId"],

          merge(existing, incoming) {
            if (incoming.cursor === existing?.cursor) {
              return existing;
            }
            const merged =
              existing !== undefined ? existing.comments.slice(0) : [];
            let offset = merged.length;
            for (let i = 0; i < incoming.comments.length; ++i) {
              merged[offset + i] = incoming.comments[i];
            }
            const result = {
              cursor: incoming.cursor,
              hasMore: incoming.hasMore,
              comments: merged,
            };
            return result;
          },

          read(existing) {
            if (existing) {
              return {
                cursor: existing.cursor,
                hasMore: existing.hasMore,
                comments: Object.values(existing.comments),
              };
            }
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
        notification: {
          merge(existing, incoming) {
            // Slicing is necessary because the existing data is
            // immutable, and frozen in development.
            const merged = existing ? existing.slice(0) : [];
            let offset = 0;
            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i];
            }
            return merged;
          },
        },
      },
    },
    User: {
      merge: true,
    },
  },
});

export const resolvers = {
  Mutation: {
    logUserIn: async (_, { token }) => {
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
    logUserOut: () => {
      localStorage.removeItem("token");
      isLoggedInVar(false);
      window.location.reload("/");
      return null;
    },
  },
};
