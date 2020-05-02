import React, { useState } from "react";

import {
  makeStyles,
  TextField,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  Grid,
  InputLabel,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { useMutation } from "@apollo/react-hooks";
import { CREATE_TODO_ITEM, GET_TODO_LIST } from "../../gql";

import { Error } from "../Global";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    "& > div": {
      marginBottom: theme.spacing(1),
    },
  },
  grid: {
    display: "flex",
    alignItems: "end",
    position: "relative",
  },
}));

export const CreateTodoItem = ({ todoListId, calculateWorth }) => {
  const [newItemName, setNewItemName] = useState("");
  const [itemWorth, setItemWorth] = useState("1");

  const [createTodoItem, { error }] = useMutation(CREATE_TODO_ITEM);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodoItem({
      variables: {
        itemName: newItemName,
        todoListId: todoListId,
        itemWorth: itemWorth,
      },
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
        <Grid container spacing={1} className={classes.grid}>
          {calculateWorth && (
            <Grid item xs={3}>
              <FormControl fullWidth variant="outlined">
                <Select
                  id="item-worth-input"
                  value={itemWorth}
                  onChange={(e) => setItemWorth(e.target.value)}
                >
                  <MenuItem value="1">1</MenuItem>
                  <MenuItem value="2">2</MenuItem>
                  <MenuItem value="3">3</MenuItem>
                  <MenuItem value="4">4</MenuItem>
                  <MenuItem value="5">5</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          )}
          <Grid item xs={calculateWorth ? 9 : 12}>
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
          </Grid>
        </Grid>
      </form>
    </>
  );
};
