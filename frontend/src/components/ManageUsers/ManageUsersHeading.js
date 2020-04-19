import React from "react";

import { makeStyles, Button } from "@material-ui/core";

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
      <Button color="primary" variant="contained">
        Add User
      </Button>
    </div>
  );
};
