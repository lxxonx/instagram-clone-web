import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, SIGN_UP } from "./AuthQueries";
import { Redirect } from "react-router-dom";

function AuthContainer() {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstname = useInput("");
  const lastname = useInput("");
  const email = useInput("");

  const [requestSecret, { error }] = useMutation(LOG_IN, {
    variables: { email: email.value },
  });
  const [createUser, { error: createUserError }] = useMutation(SIGN_UP, {
    variables: {
      email: email.value,
      username: username.value,
      firstname: firstname.value,
      lastname: lastname.value,
    },
  });
  const onLogin = (e) => {
    e.preventDefault();
    const {
      target: { name },
    } = e;
    switch (name) {
      case "logIn":
        if (email !== "") {
          try {
            requestSecret();
            return <Redirect to="/" />;
          } catch {
            console.log(error);
          }
        }
        break;

      default:
        if (email !== "" && username !== "") {
          try {
            createUser();
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
      lastname={lastname}
      email={email}
      onLogin={onLogin}
    />
  );
}

export default AuthContainer;
