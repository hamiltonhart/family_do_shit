import React, { useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import { UPDATE_TODO_ITEM } from "../../gql";

import { TextField, Button, Typography, Grid } from "@material-ui/core";

import { Error } from "../Global";
import { Modal, ModalContent } from "../Global/Modal";

export const EditTodoItem = ({ todoItem, toggleEditModal }) => {
  const [itemName, setItemName] = useState(todoItem.itemName);
  const [updateTodoItem, { error }] = useMutation(UPDATE_TODO_ITEM);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodoItem({
      variables: { id: todoItem.id, itemName },
      onCompleted: handleCompleted(),
    });
  };

  const handleToggleClose = (e) => {
    e.stopPropagation();
    setItemName(todoItem.itemName);
    toggleEditModal();
  };

  const handleCompleted = () => {
    toggleEditModal();
  };

  return (
    <>
      {error ? (
        <Error errorMessage={error.message} />
      ) : (
        <Modal>
          {console.log("here is the modal")}
          <ModalContent toggle={(e) => handleToggleClose(e)}>
            <Typography variant="h5" align="center">
              Edit Item
            </Typography>
            <form onSubmit={(e) => handleSubmit(e)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Item Name"
                    variant="outlined"
                    fullWidth
                    autoFocus
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    color="primary"
                    fullWidth
                  >
                    Confirm
                  </Button>
                </Grid>
              </Grid>
            </form>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};