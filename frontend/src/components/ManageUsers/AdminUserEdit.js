import React, { useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import { UPDATE_USER, GET_USERS } from "../../gql";

import {
  makeStyles,
  Button,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";

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

export const AdminUserEdit = ({ user, dispatch }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [superuser, setSuperuser] = useState(user.isSuperuser);

  const [updateUser, { error }] = useMutation(UPDATE_USER);

  const handleCloseEdit = () => {
    setUsername(user.username);
    setEmail(user.email);
    setSuperuser(user.isSuperuser);
    dispatch({ show: "detail" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({
      variables: {
        id: user.id,
        username,
        email,
        isSuperuser: superuser,
      },
      onCompleted: handleCloseEdit(),
    });
  };

  const classes = useStyles();
  return (
    <>
      <Typography align="center" variant="h5">
        {`Edit ${user.username}`}
      </Typography>
      <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={superuser}
              color="primary"
              onChange={() => setSuperuser(!superuser)}
              name="superuser"
            />
          }
          label="Admin"
        />
        <div className={classes.buttonSection}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            type="submit"
          >
            Confirm
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
