import React, { useState } from "react";

import { makeStyles, Button, Paper, TextField } from "@material-ui/core";

import { useMutation } from "@apollo/react-hooks";
import { CREATE_TODO_LIST, GET_TODO_LISTS } from "../../gql";

import { useToggle } from "../../utilities";
import { Error } from "../Global";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  form: {
    padding: theme.spacing(2),
    "& > *": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));

export const CreateTodoList = () => {
  const { isShowing, toggle } = useToggle();
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
    toggle();
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {error && <Error errorMessage={error.message} />}
      <Button
        size="medium"
        color={isShowing ? "secondary" : "primary"}
        variant={isShowing ? "outlined" : "contained"}
        fullWidth
        onClick={toggle}
      >
        {isShowing ? "Close" : "Create List"}
      </Button>
      {isShowing && (
        <Paper variant="outlined">
          <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
            <TextField
              color="primary"
              variant="outlined"
              label="List Name"
              fullWidth
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
        </Paper>
      )}
    </div>
  );
};
