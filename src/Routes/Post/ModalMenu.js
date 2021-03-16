import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { toast } from "react-toastify";
import { refreshPage } from "../../Components/Util";

export const EDIT_POST = gql`
  mutation editPost(
    $id: String!
    $location: String
    $caption: String
    $action: ACTIONS!
  ) {
    editPost(id: $id, location: $location, caption: $caption, action: $action)
  }
`;
const DELETE = "DELETE";
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
`;
const MenuItems = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: capitalize;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid #e6e6e6;
  }
`;
function ModalMenu({ showing, setModal, id, isSelf }) {
  const modalRef = useRef();
  const [deletePost] = useMutation(EDIT_POST, {
    variables: {
      id: id,
      action: DELETE,
    },
  });
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
      <ModalContents ref={modalRef}>
        {isSelf && <MenuItems>edit</MenuItems>}
        <MenuItems>send</MenuItems>
        {isSelf && (
          <MenuItems
            style={{ color: "red" }}
            onClick={async () => {
              await deletePost({
                update: (_, { data }) => {
                  if (!data.editPost) {
                    toast.error(<div>An error occured, sorry retry again</div>);
                  } else {
                    toast.success(<div>The post has been removed</div>);
                  }
                  refreshPage();
                },
              });
            }}
          >
            delete
          </MenuItems>
        )}

        <MenuItems
          onClick={() => {
            setModal(false);
          }}
        >
          Cancel
        </MenuItems>
      </ModalContents>
    </ModalWrapper>
  );
}

export default ModalMenu;
