import { useQuery } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import Modal from "../../Components/Modal";
import { MYFOLLWERS } from "../../Components/SharedQueries";
import { Username } from "../../Styles/Username";
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
const UserList = styled.ul`
  border: 0;
`;
const Users = styled.li`
  padding: 16px;
  display: flex;
  border: 0;
  :hover {
    background-color: #dbdbdb;
  }
  span {
    line-height: 30px;
    height: 30px;
  }
`;
const CheckBox = styled.input.attrs({ type: "checkbox" })`
  margin-left: auto;
  margin-right: 0;
  width: 1rem;
  height: 1rem;
  border: 0;
`;
function NewMessageModal({ showing, setModal }) {
  const { data } = useQuery(MYFOLLWERS);

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
      <UserList>
        {data?.me.following.map((user, index) => {
          return (
            <Users key={index}>
              <Username>{user.username}</Username>
              <CheckBox />
            </Users>
          );
        })}
      </UserList>
    </Modal>
  );
}

export default NewMessageModal;
