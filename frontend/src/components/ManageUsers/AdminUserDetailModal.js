import React, { useReducer } from "react";

import { useQuery } from "@apollo/react-hooks";
import { GET_USER } from "../../gql";

import { Error, Loading } from "../Global";
import { Modal, ModalContent } from "../Global/Modal";
import { AdminUserDetail } from "./AdminUserDetail";
import { AdminUserEdit } from "./AdminUserEdit";
import { AdminUserChangePassword } from "./AdminUserChangePassword";

const initialState = {
  detailIsShowing: true,
  editIsShowing: false,
  changePasswordIsShowing: false,
};

function reducer(state, action) {
  switch (action.show) {
    case "detail":
      return {
        detailIsShowing: true,
        editIsShowing: false,
        changePasswordIsShowing: false,
      };
    case "edit":
      return {
        detailIsShowing: false,
        editIsShowing: true,
        changePasswordIsShowing: false,
      };
    case "password":
      return {
        detailIsShowing: false,
        editIsShowing: false,
        changePasswordIsShowing: true,
      };
    default:
      return {
        detailIsShowing: true,
        editIsShowing: false,
        changePasswordIsShowing: false,
      };
  }
}

export const AdminUserDetailModal = ({ userId, toggle }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { data, error, loading } = useQuery(GET_USER, {
    variables: { id: userId },
  });

  return (
    <Modal>
      <ModalContent toggle={toggle}>
        {loading && <Loading />}
        {error && <Error errorMessage={error.message} />}
        {data && (
          <>
            {state.detailIsShowing && (
              <AdminUserDetail user={data.user} dispatch={dispatch} />
            )}
            {state.editIsShowing && (
              <AdminUserEdit user={data.user} dispatch={dispatch} />
            )}
            {state.changePasswordIsShowing && (
              <AdminUserChangePassword user={data.user} dispatch={dispatch} />
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
