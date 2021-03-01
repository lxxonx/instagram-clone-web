import React from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(1, 1, 1, 0.5);
  z-index: 5;
`;
const ModalContents = styled.div`
  position: absolute;
  background-color: white;
  width: 400px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
`;
function Modal({ child }) {
  return (
    <ModalWrapper>
      <ModalContents>contents</ModalContents>
    </ModalWrapper>
  );
}

export default Modal;
