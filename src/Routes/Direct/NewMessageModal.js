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
  display: ${(props) => (props.showing ? "block" : "none")};
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
const ModalHeader = styled.div`
  width: 100%;
  padding: 10px;
  height: 45px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #dbdbdb;
  vertical-align: center;
  align-items: center;
`;
const NextButton = styled.button`
  background-color: transparent;
  border: 0;
  color: ${(props) => props.theme.blueColor};
`;
const CloseButton = styled.button`
  background-color: transparent;
  border: 0;
`;
function NewMessageModal({ showing, setModal }) {
  return (
    <ModalWrapper showing={showing}>
      <ModalContents>
        <ModalHeader>
          <CloseButton
            onClick={() => {
              setModal(false);
            }}
          >
            x
          </CloseButton>
          New message<NextButton>Next</NextButton>
        </ModalHeader>
      </ModalContents>
    </ModalWrapper>
  );
}

export default NewMessageModal;
