import React from "react";

import { makeStyles, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  section: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  label: {
    color: theme.palette.grey[500],
  },
}));

export const AdminUserDetail = ({ user }) => {
  const classes = useStyles();
  return (
    <div>
      <Typography variant="h6">{user.username}</Typography>
      <Typography variant="body1">{user.email}</Typography>
      {user.isSuperuser && <Typography variant="body1">Admin</Typography>}
      <div className={classes.section}>
        <Button variant="contained" color="primary">
          Edit
        </Button>
        <Button variant="outlined">Change Password</Button>
      </div>
    </div>
  );
};
