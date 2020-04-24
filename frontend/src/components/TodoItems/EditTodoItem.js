import React, { useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import { UPDATE_TODO_ITEM } from "../../gql";

import {
  makeStyles,
  IconButton,
  TextField,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import { Error } from "../Global";
import { Modal, ModalContent } from "../Global/Modal";
import { useToggle } from "../../utilities";

const useStyles = makeStyles((theme) => ({}));

export const EditTodoItem = ({ todoItem, todoListId }) => {
  const [itemName, setItemName] = useState(todoItem.itemName);
  const { isShowing, toggle } = useToggle();
  const [updateTodoItem, { error }] = useMutation(UPDATE_TODO_ITEM);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodoItem({
      variables: { id: todoItem.id, itemName },
      onCompleted: toggle(),
    });
  };

  const handleToggleClose = (e) => {
    e.stopPropagation();
    setItemName(todoItem.itemName);
    toggle();
  };

  return (
    <>
      {error && <Error errorMessage={error.message} />}
      <IconButton onClick={toggle}>
        <EditIcon />
      </IconButton>
      {isShowing && (
        <Modal>
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
