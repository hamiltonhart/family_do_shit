import React from "react";

import { makeStyles, TableRow, TableCell } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import RemoveIcon from "@material-ui/icons/Remove";

import { useToggle } from "../../utilities";
import { AdminUserDetailModal } from "./AdminUserDetailModal";

const useStyles = makeStyles((theme) => ({
  inactiveUser: {
    "& th, td": {
      textDecoration: "italic",
      color: theme.palette.grey[400],
    },
  },
}));

export const AdminUserItem = ({ user }) => {
  const { isShowing, toggle } = useToggle();

  const handleItemClick = () => {
    toggle();
  };

  const classes = useStyles();

  return (
    <>
      <TableRow
        className={user.isActive ? "" : classes.inactiveUser}
        onClick={handleItemClick}
      >
        <TableCell component="th" scope="row">
          {user.username}
        </TableCell>
        <TableCell align="right">{user.email}</TableCell>
        <TableCell align="right">
          {user.isSuperuser ? <CheckIcon /> : <RemoveIcon />}
        </TableCell>
      </TableRow>
      {isShowing && <AdminUserDetailModal toggle={toggle} userId={user.id} />}
    </>
  );
};
