import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useMutation } from "react-apollo-hooks";
import { toast } from "react-toastify";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import { LOG_IN, SIGN_UP } from "./AuthQueries";
function AuthContainer() {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstname = useInput("");
  const lastname = useInput("");
  const emailOrPhone = useInput("");
  const password = useInput("");
  const emailOrUsername = useInput("");

  const [login] = useMutation(LOG_IN);
  const [createUser, { error: createUserError }] = useMutation(SIGN_UP, {
    variables: {
      emailOrPhone: emailOrPhone.value,
      emailOrUsername: emailOrUsername.value,
      username: username.value,
      firstname: firstname.value,
      lastname: lastname.value,
      password: password.value,
    },
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    const {
      target: { name },
    } = e;

    switch (name) {
      case "logIn":
        if (emailOrUsername !== "") {
          await login({
            variables: {
              emailOrUsername: emailOrUsername.value,
              password: password.value,
            },
            update: (_, { data }) => {
              const { login } = data;
              if (login.error) {
                toast.error(
                  <>
                    {login.error.message}
                    <br />
                    Please sign up first!
                  </>,
                  { autoClose: 3000 }
                );
                setTimeout(() => setAction("signUp"), 1000);
              } else {
                toast.success(
                  <>
                    welcome <b>{login.user.username}</b>
                  </>
                );
              }
            },
          });
          return <Redirect to="/" />;
        }
        break;

      default:
        if (emailOrPhone !== "" && username !== "") {
          try {
            await createUser();
            return <Redirect to="/" />;
          } catch {
            console.log(createUserError);
          }
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
      onSubmit={onSubmit}
    />
  );
}

export default AuthContainer;
