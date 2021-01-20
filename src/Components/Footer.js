import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const FooterTag = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-transform: capitalize;
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 50px;
`;

const List = styled.ul`
  display: flex;
  margin-bottom: 10px;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const Link = styled.a`
  color: ${(props) => props.theme.darkGreyColor};
  font-weight: 400;
`;

const Copyright = styled.span`
  margin-top: 10px;
  color: ${(props) => props.theme.darkGreyColor};
  font-weight: 400;
`;
const Language = styled.select`
  border: none;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.darkGreyColor};
`;

const Footer = ({ signUpPage }) => {
  return (
    <FooterTag>
      <List>
        <ListItem>
          <Link href="#">about</Link>
        </ListItem>
        <ListItem>
          <Link href="#">blog</Link>
        </ListItem>
        <ListItem>
          <Link href="#">jobs</Link>
        </ListItem>
        <ListItem>
          <Link href="#">help</Link>
        </ListItem>
        <ListItem>
          <Link href="#">api</Link>
        </ListItem>
        <ListItem>
          <Link href="#">privacy</Link>
        </ListItem>
        <ListItem>
          <Link href="#">terms</Link>
        </ListItem>
        <ListItem>
          <Link href="#">top accounts</Link>
        </ListItem>
        <ListItem>
          <Link href="#">hashtags</Link>
        </ListItem>
        <ListItem>
          <Link href="#">locations</Link>
        </ListItem>
      </List>
      {signUpPage ? (
        <List>
          <ListItem>
            <Link href="#">beauty</Link>
          </ListItem>
          <ListItem>
            <Link href="#">dance & performance</Link>
          </ListItem>
          <ListItem>
            <Link href="#">fitness</Link>
          </ListItem>
          <ListItem>
            <Link href="#">food & drink</Link>
          </ListItem>
          <ListItem>
            <Link href="#">home & garden</Link>
          </ListItem>
          <ListItem>
            <Link href="#">music</Link>
          </ListItem>
          <ListItem>
            <Link href="#">visual arts</Link>
          </ListItem>
        </List>
      ) : null}
      <Copyright>
        <Language href="#">language</Language> &copy; {new Date().getFullYear()}
        Instaclone
      </Copyright>
    </FooterTag>
  );
};
Footer.propTypes = {
  signUpPage: PropTypes.bool,
};
export default Footer;
