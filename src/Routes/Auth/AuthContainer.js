import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import {
  CONFIRM_SECRET,
  FORGOT_PWD,
  LOG_IN,
  SIGN_UP,
  WRITE_TOKEN,
} from "./AuthQueries";

function AuthContainer() {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstname = useInput("");
  const emailOrPhone = useInput("");
  const password = useInput("");
  const emailOrUsername = useInput("");
  const secret = useInput("");
  const [email, setEmail] = useState("");
  const [logUserIn] = useMutation(WRITE_TOKEN);
  const [login] = useMutation(LOG_IN, {
    variables: {
      emailOrUsername: emailOrUsername.value,
      password: password.value,
    },
  });
  const [createUser] = useMutation(SIGN_UP, {
    variables: {
      emailOrPhone: emailOrPhone.value,
      username: username.value,
      firstname: firstname.value,
      password: password.value,
    },
  });
  const [forgotPwd] = useMutation(FORGOT_PWD, {
    variables: {
      email: emailOrPhone.value,
    },
  });
  const [confirmSecret] = useMutation(CONFIRM_SECRET, {
    variables: {
      email,
      secret: secret.value,
    },
  });
  const toastError = (error) => {
    toast.error(<b>{error.message}</b>, { autoClose: 3000 });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const {
      target: { name },
    } = e;

    switch (name) {
      case "logIn":
        if (emailOrUsername !== "") {
          // LOG IN FN
          await login({
            update: async (_, { data }) => {
              const { login } = data;
              if (!login.error) {
                // there's no error => log the user in
                if (login.token !== "" || login.token !== undefined) {
                  await logUserIn({
                    variables: {
                      token: login.token,
                    },
                  });
                } else {
                  throw Error(
                    "you can't log in. something wrong with the token"
                  );
                }
                toast.success(
                  <div>
                    Welcome, <strong>{login.user.username}</strong>
                  </div>
                );
              } else {
                //there is an error then toast the error
                toastError(login.error);
              }
            },
          });
          return <Redirect to="/" />;
        }
        break;

      case "signUp":
        // SIGN UP FN
        if (emailOrPhone !== "" && username !== "") {
          await createUser({
            update: async (_, { data }) => {
              const { createUser } = data;
              if (!createUser.error) {
                // there is no error
                // create the user && log the user in
                await login({
                  variables: {
                    emailOrUsername: username.value,
                    password: password.value,
                  },
                  update: async (_, { data }) => {
                    const { login } = data;
                    if (!login.error) {
                      // there's no error => log the user in
                      if (login.token !== "" || login.token !== undefined) {
                        await logUserIn({
                          variables: {
                            token: login.token,
                          },
                        });
                      } else {
                        throw Error(
                          "you can't log in. something wrong with the token"
                        );
                      }
                    }
                  },
                });
                toast.success(
                  <div>
                    Welcome, <strong>{login.user.username}</strong>
                  </div>
                );
              } else {
                //there is an error then toast the error
                toastError(createUser.error);
              }
            },
          });
          return <Redirect to="/" />;
        }
        break;
      case "forgotPassword":
        // FORGOT PASSWORD FN
        if (emailOrPhone !== "") {
          await forgotPwd({
            update: (_, { data, error }) => {
              if (error) {
                toastError(error);
              }
              if (data.requestSecret) {
                toast.success(<div>sent a mail seccessfully, </div>);
                setEmail(emailOrPhone.value);
                setAction("confirmSecret");
              }
            },
          });
        }
        break;
      default:
        // CONFIRM SECRET
        if (secret !== "") {
          await confirmSecret({
            update: async (_, { data }) => {
              const { confirmSecret } = data;
              if (!confirmSecret.error) {
                // there's no error => log the user in
                if (
                  confirmSecret.token !== "" ||
                  confirmSecret.token !== undefined
                ) {
                  await logUserIn({
                    variables: {
                      token: confirmSecret.token,
                    },
                  });
                } else {
                  throw Error(
                    "you can't log in. something wrong with the token"
                  );
                }
                toast.success(
                  <div>
                    Welcome, <strong>{confirmSecret.user.username}</strong>
                  </div>
                );
              } else {
                //there is an error then toast the error
                toastError(confirmSecret.error);
              }
            },
          });
          return <Redirect to="/" />;
        }
        break;
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      username={username}
      firstname={firstname}
      emailOrUsername={emailOrUsername}
      emailOrPhone={emailOrPhone}
      password={password}
      secret={secret}
      onSubmit={onSubmit}
    />
  );
}

export default AuthContainer;
