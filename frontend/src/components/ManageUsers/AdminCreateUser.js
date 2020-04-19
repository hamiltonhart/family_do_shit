import React, { useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import { CREATE_USER, GET_USERS } from "../../gql";

import {
  makeStyles,
  Button,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";

import { useToggle } from "../../utilities";
import { Error } from "../Global";
import { Modal, ModalContent } from "../Global/Modal";

const useStyles = makeStyles((theme) => ({
  form: {
    "& > *": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));

export const AdminCreateUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [superuser, setSuperuser] = useState(false);

  const { isShowing, toggle } = useToggle();
  const [createUser, { error }] = useMutation(CREATE_USER);

  const handleCloseModal = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setSuperuser(false);
    toggle();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({
      variables: { username, email, password, isSuperuser: superuser },
      refetchQueries: [{ query: GET_USERS }],
      onCompleted: handleCloseModal(),
    });
  };

  const classes = useStyles();
  return (
    <>
      <Button color="primary" variant="contained" onClick={toggle}>
        Add User
      </Button>
      {isShowing && (
        <Modal>
          <ModalContent toggle={handleCloseModal}>
            <Typography align="center" variant="h5">
              Add User
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
              <TextField
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

              <Button
                variant="contained"
                size="large"
                color="primary"
                type="submit"
                fullWidth
              >
                Add User
              </Button>
            </form>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
