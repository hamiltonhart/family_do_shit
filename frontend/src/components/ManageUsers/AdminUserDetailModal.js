import React from "react";

import { Modal, ModalContent } from "../Global/Modal";

import { AdminUserDetail } from "./AdminUserDetail";
import { AdminUserEdit } from "./AdminUserEdit";
import { AdminUserChangePassword } from "./AdminUserChangePassword";

export const AdminUserDetailModal = ({ user, toggle }) => {
  return (
    <Modal>
      <ModalContent toggle={toggle}>
        {true && <AdminUserDetail user={user} />}
        {false && <AdminUserEdit user={user} />}
        {false && <AdminUserChangePassword user={user} />}
      </ModalContent>
    </Modal>
  );
};
