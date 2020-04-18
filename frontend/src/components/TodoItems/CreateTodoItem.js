import React, { useState } from "react";

import { makeStyles, Button, Paper, TextField } from "@material-ui/core";

import { useMutation } from "@apollo/react-hooks";
import { CREATE_TODO_ITEM, GET_TODO_LIST } from "../../gql";

import { useToggle } from "../../utilities";
import { Error } from "../Global";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    "& > *": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));

export const CreateTodoItem = ({ todoListId, createButtonShowing }) => {
  const { isShowing, toggle } = useToggle();
  const [newItemName, setNewItemName] = useState("");

  const [createTodoItem, { error }] = useMutation(CREATE_TODO_ITEM);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodoItem({
      variables: { itemName: newItemName, todoListId: todoListId },
      refetchQueries: [{ query: GET_TODO_LIST, variables: { id: todoListId } }],
      onCompleted: handleComplete(),
    });
  };

  const handleComplete = () => {
    setNewItemName("");
    toggle();
  };

  const classes = useStyles();
  return (
    <>
      {error && <Error errorMessage={error.message} />}
      {createButtonShowing && (
        <Button
          size="medium"
          color={isShowing ? "secondary" : "primary"}
          variant={isShowing ? "outlined" : "contained"}
          fullWidth
          onClick={toggle}
        >
          {isShowing ? "Close" : "Add Item"}
        </Button>
      )}
      {isShowing && (
        <Paper variant="outlined">
          <form className={classes.root} onSubmit={(e) => handleSubmit(e)}>
            <TextField
              color="primary"
              variant="outlined"
              label="Item Name"
              fullWidth
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
            />
            <Button
              type="submit"
              size="large"
              color="primary"
              fullWidth
              variant="contained"
            >
              Add
            </Button>
          </form>
        </Paper>
      )}
    </>
  );
};
