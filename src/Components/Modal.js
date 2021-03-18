import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(1, 1, 1, 0.5);
  z-index: 100;
  display: ${(props) => (props.showing ? "block" : "none")};
`;
const ModalContents = styled.div`
  position: absolute;
  background-color: white;
  width: 400px;
  ${(props) => {
    if (props.height) return `height: ${props.height}px`;
  }};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
`;
function Modal({ children, showing, setModal, height }) {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickAway = (e) => {
      if (modalRef && !modalRef.current.contains(e.target)) {
        setModal(false);
      }
    };

    if (showing) {
      window.addEventListener("click", handleClickAway);
      document.body.style.cssText = `overflow-y: hidden;`;
    }
    return () => {
      if (showing) {
        window.removeEventListener("click", handleClickAway);
        document.body.style.cssText = `overflow-y: scroll;`;
      }
    };
  }, [modalRef, showing, setModal]);
  return (
    <ModalWrapper showing={showing}>
      <ModalContents ref={modalRef} height={height}>
        {children}
      </ModalContents>
    </ModalWrapper>
  );
}

export default Modal;
