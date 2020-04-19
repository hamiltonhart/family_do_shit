import React from "react";

import { makeStyles } from "@material-ui/core";

import { AdminCreateUser } from "./AdminCreateUser";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: theme.spacing(2),
  },
}));
export const ManageUsersHeading = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AdminCreateUser />
    </div>
  );
};
