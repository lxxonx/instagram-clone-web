import React from "react";
import styled from "styled-components";
import Modal from "../../Components/Modal";

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
    <Modal showing={showing} setModal={setModal} height={500}>
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
    </Modal>
  );
}

export default NewMessageModal;
