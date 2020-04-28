import React, { useState } from "react";

import {
  makeStyles,
  Button,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";

import { useMutation } from "@apollo/react-hooks";
import { CREATE_TODO_LIST, GET_TODO_LISTS } from "../../gql";

import { useToggle } from "../../utilities";
import { Error } from "../Global";
import { Modal, ModalContent } from "../Global/Modal";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  form: {
    "& > *": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));

export const CreateTodoList = ({ modalToggle }) => {
  const [newListName, setNewListName] = useState("");

  const [createTodoList, { error }] = useMutation(CREATE_TODO_LIST);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodoList({
      variables: { title: newListName },
      refetchQueries: [{ query: GET_TODO_LISTS }],
      onCompleted: handleComplete(),
    });
  };

  const handleComplete = () => {
    setNewListName("");
    modalToggle();
  };

  const classes = useStyles();
  return (
    <Modal>
      <ModalContent toggle={modalToggle}>
        <div className={classes.root}>
          {error && <Error errorMessage={error.message} />}
          <Typography variant="h5" align="center">
            New List
          </Typography>
          <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
            <TextField
              color="primary"
              variant="outlined"
              label="List Name"
              fullWidth
              autoFocus
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
            <Button
              type="submit"
              size="large"
              color="primary"
              fullWidth
              variant="contained"
            >
              Create
            </Button>
          </form>
        </div>
      </ModalContent>
    </Modal>
  );
};
