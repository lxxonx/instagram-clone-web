// if you have a lot of UI
// menu open/close etc...

export const defaults = {
  isLoggedIn: localStorage.getItem("token") === null ? false : true,
};

export const resolvers = {
  Mutation: {
    logUserIn: (_, { token }, { cache }) => {
      localStorage.setItem("token", token);
      cache.writeData({
        data: {
          isLoggedIn: true,
        },
      });
      return null;
    },
    logUserOut: (_, __, { cache }) => {
      localStorage.removeItem("token");
      // redirect/ reopen the window
      window.location.reload();
      return null;
    },
  },
};
