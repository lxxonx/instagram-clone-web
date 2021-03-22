import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import styled from "styled-components";
import Modal from "../../Components/Modal";
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
  const history = useHistory();
  const [deletePost, { loading }] = useMutation(EDIT_POST, {
    variables: {
      id: id,
      action: DELETE,
    },
  });
  return (
    <Modal showing={showing} setModal={setModal}>
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
                history.push("/");
                refreshPage();
              },
            });
          }}
        >
          {loading ? "loading" : "delete"}
        </MenuItems>
      )}
      <MenuItems
        onClick={() => {
          setModal(false);
        }}
      >
        Cancel
      </MenuItems>
    </Modal>
  );
}

export default ModalMenu;
