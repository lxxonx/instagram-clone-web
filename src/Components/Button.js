import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.button`
  border: 0;
  border: ${(props) => props.theme.boxBorder};
  border-radius: ${(props) => props.theme.borderRadius};
  background-color: ${(props) => props.theme.blueColor};
  height: 35px;
  font-size: 12px;
  padding: 0px 15px;
  color: white;
  text-align: center;
  font-weight: 600;
`;

const Button = ({ text }) => <Container>{text}</Container>;

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
