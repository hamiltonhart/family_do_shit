import React from "react";

import { makeStyles, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  buttonSection: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
}));

export const AdminUserDetail = ({ user, dispatch }) => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h6">{user.username}</Typography>
      <Typography variant="body1">{user.email}</Typography>
      {user.isSuperuser && <Typography variant="body1">Admin</Typography>}
      <div className={classes.buttonSection}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch({ show: "edit" })}
        >
          Edit
        </Button>
        <Button
          variant="outlined"
          onClick={() => dispatch({ show: "password" })}
        >
          Change Password
        </Button>
      </div>
    </div>
  );
};
