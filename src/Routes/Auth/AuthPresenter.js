import React from "react";
import styled from "styled-components";
import Button from "../../Components/Button";
import Footer from "../../Components/Footer";
import Input from "../../Components/Input";

const Wrapper = styled.div`
  min-height: 100%;
  margin: 100px auto 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${(props) => props.theme.whiteBox}
  border-radius:0px;
  width: 100%;
  max-width: 350px;
`;
const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
`;
const Title = styled.h1`
  height: 100px;
  width: 700px;
  background-image: url("https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png");
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      width: 100%;
      margin-top: 10px;
    }
  }
`;
const USERNAME = "전화번호, 사용자 이름 또는 이메일";
function AuthPresenter({
  setAction,
  action,
  username,
  firstname,
  lastname,
  email,
  onLogin,
}) {
  return (
    <>
      <Wrapper>
        <Title />
        <Form>
          {action === "logIn" ? (
            <form name="logIn" onSubmit={onLogin}>
              <Input placeholder={USERNAME} {...username} />
              <Button text={"Log in"} />
            </form>
          ) : (
            <form name="signUp" onSubmit={onLogin}>
              <Input placeholder={"First name"} {...firstname} />
              <Input placeholder={"Last name"} {...lastname} />
              <Input placeholder={"Email"} {...email} />
              <Input placeholder={"Username"} {...username} />
              <Button text={"Sign up"} />
            </form>
          )}
        </Form>
        <StateChanger>
          {action === "logIn" ? (
            <>
              Don't have an account?
              <Link onClick={() => setAction("signUp")}> Sign up</Link>
            </>
          ) : (
            <>
              Have an account?
              <Link onClick={() => setAction("logIn")}> Log in</Link>
            </>
          )}
        </StateChanger>
      </Wrapper>
      <Footer signUpPage={action === "logIn" ? false : true} />
    </>
  );
}

export default AuthPresenter;
