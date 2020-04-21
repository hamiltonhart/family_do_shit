import React, { useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import { UPDATE_USER } from "../../gql";

import { makeStyles, Button, Typography, TextField } from "@material-ui/core";

import { Error } from "../Global";

const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  buttonSection: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
}));

export const AdminUserChangePassword = ({ user, dispatch }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [updateUser, { error }] = useMutation(UPDATE_USER);

  const handleClosePassword = () => {
    setPassword("");
    dispatch({ show: "detail" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({
      variables: {
        id: user.id,
        password,
      },
      onCompleted: handleClosePassword(),
    });
  };

  const classes = useStyles();
  return (
    <>
      <Typography align="center" variant="h5">
        {`Edit ${user.username}`}
      </Typography>
      {error && <Error errorMessage={error.message} />}
      <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
        <TextField
          type="password"
          label="New Password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          type="password"
          label="Confirm New Password"
          variant="outlined"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className={classes.buttonSection}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            type="submit"
            disabled={password === "" || password !== confirmPassword}
          >
            Change Password
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => dispatch({ show: "detail" })}
          >
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
};
