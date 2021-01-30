import React from "react";
import styled from "styled-components";
import Button from "../../Components/Button";
import Footer from "../../Components/Footer";
import Input from "../../Components/Input";

const Title = styled.h1`
  height: 100px;
  width: 700px;
  background-image: url("https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png");
`;
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
  max-width: 388px;
`;

const Divider = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  flex-grow: 1;
  flex-shrink: 1;
  background-color: rgba(var(--b38, 219, 219, 219), 1);
  height: 1px;
  top: 0.45em;
`;
const DividerText = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  color: rgba(var(--f52, 142, 142, 142), 1);
  font-size: 13px;
  font-weight: 600;
  line-height: 6px;
  margin: 0 18px;
  text-transform: uppercase;
`;
const DividerWrapper = styled.div`
  margin: 18px 0px;
  padding: 0;
  display: flex;
  flex-direction: row;
`;

const Help = styled.div`
  color: ${(props) => props.theme.darkGreyColor};
  text-align: center;
  margin: 10px 0px;
`;

const ForgotPassword = styled(Box)`
  border-color: white;
  text-decoration: none;
  color: rgba(var(--fe0, 0, 55, 107), 1);
  font-size: 13px;
  margin-top: 12px;
  text-align: center;
  text-transform: capitalize;
  span {
    color: ${(props) => props.theme.blackColor};
  }
`;
const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
  text-transform: capitalize;
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

const Link = styled.span`
  color: ${(props) => props.theme.blueColor};
  cursor: pointer;
  font-weight: 600;
`;

const USERNAME = "전화번호, 사용자 이름 또는 이메일";
function AuthPresenter({
  setAction,
  action,
  username,
  emailOrUsername,
  firstname,
  password,
  emailOrPhone,
  onSubmit,
}) {
  return (
    <>
      <Wrapper>
        <Title />
        <Form>
          {action === "logIn" && (
            <>
              <form name="logIn" onSubmit={onSubmit}>
                <Input
                  placeholder={USERNAME}
                  value={emailOrUsername.value}
                  onChange={emailOrUsername.onChange}
                />
                <Input
                  placeholder={"password"}
                  type="password"
                  value={password.value}
                  onChange={password.onChange}
                />
                <Button text={"Log in"} />
              </form>
              <DividerWrapper>
                <Divider />
                <DividerText> 또는 </DividerText>
                <Divider />
              </DividerWrapper>
              <ForgotPassword>
                <Link onClick={() => setAction("forgotPassword")}>
                  forgot password?
                </Link>
              </ForgotPassword>
            </>
          )}
          {action === "signUp" && (
            <form name="signUp" onSubmit={onSubmit}>
              <Input
                placeholder={"Email or Phone Number"}
                value={emailOrPhone.value}
                onChange={emailOrPhone.onChange}
              />
              <Input
                placeholder={"First name"}
                value={firstname.value}
                onChange={firstname.onChange}
              />
              <Input
                placeholder={"Username"}
                value={username.value}
                onChange={username.onChange}
              />
              <Input
                placeholder={"password"}
                type="password"
                value={password.value}
                onChange={password.onChange}
              />
              <Button text={"Sign up"} />
            </form>
          )}
          {action === "forgotPassword" && (
            <>
              <Help>
                Enter your email, phone, or username and we'll send you a link
                to get back into your account.
              </Help>
              <form name="forgotPassword" onSubmit={onSubmit}>
                <Input
                  placeholder={"Email or Phone Number"}
                  value={emailOrPhone.value}
                  onChange={emailOrPhone.onChange}
                />
                <Button text={"Send Login Link"} />
              </form>
              <DividerWrapper>
                <Divider />
                <DividerText> Or </DividerText>
                <Divider />
              </DividerWrapper>
              <ForgotPassword>
                <Link onClick={() => setAction("signUp")}>
                  Create new account
                </Link>
              </ForgotPassword>
            </>
          )}
        </Form>
        <StateChanger>
          {action === "logIn" && (
            <>
              Don't have an account?
              <Link onClick={() => setAction("signUp")}> Sign up</Link>
            </>
          )}
          {action === "signUp" && (
            <>
              Have an account?
              <Link onClick={() => setAction("logIn")}> Log in</Link>
            </>
          )}
          {action === "forgotPassword" && (
            <>
              <Link onClick={() => setAction("logIn")}>Back to Login</Link>
            </>
          )}
        </StateChanger>
      </Wrapper>
      <Footer signUpPage={action === "signUp" ? true : false} />
    </>
  );
}

export default AuthPresenter;
