import React, { useState } from "react";

import { makeStyles, TextField, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { useMutation } from "@apollo/react-hooks";
import { CREATE_TODO_ITEM, GET_TODO_LIST } from "../../gql";

import { Error } from "../Global";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    "& > *": {
      marginBottom: theme.spacing(1),
    },
  },
}));

export const CreateTodoItem = ({ todoListId }) => {
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
  };

  const classes = useStyles();
  return (
    <>
      {error && <Error errorMessage={error.message} />}

      <form className={classes.root} onSubmit={(e) => handleSubmit(e)}>
        <TextField
          color="primary"
          placeholder="Add Item"
          value={newItemName}
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton type="submit" disabled={!newItemName.trim()}>
                <AddIcon />
              </IconButton>
            ),
          }}
          onChange={(e) => setNewItemName(e.target.value)}
        />
      </form>
    </>
  );
};
