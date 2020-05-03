import React, { useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import { UPDATE_TODO_ITEM } from "../../gql";

import {
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";

import { useTransition, animated } from "react-spring";

import { Error } from "../Global";
import { Modal, ModalContent } from "../Global/Modal";

export const EditTodoItem = ({
  todoItem,
  calculateWorth,
  toggleEditModal,
  isShowingEditModal,
}) => {
  const [itemName, setItemName] = useState(todoItem.itemName);
  const [itemWorth, setItemWorth] = useState(todoItem.itemWorth);

  const [updateTodoItem, { error }] = useMutation(UPDATE_TODO_ITEM);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodoItem({
      variables: { id: todoItem.id, itemName, itemWorth },
      onCompleted: handleCompleted(),
    });
  };

  const transitions = useTransition(isShowingEditModal, null, {
    from: {
      opacity: 0,
      transform: "translate3d(0, -40px, 0)",
    },
    enter: {
      opacity: 1,
      transform: "translate3d(0, 0, 0)",
    },
    leave: {
      opacity: 0,
      transform: "translate3d(0, -40px, 0)",
    },
  });

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
          {transitions.map(
            ({ item, key, props }) =>
              item && (
                <animated.div key={key} style={props}>
                  <ModalContent toggle={(e) => handleToggleClose(e)}>
                    <Typography variant="h5" align="center">
                      Edit Item
                    </Typography>
                    <form onSubmit={(e) => handleSubmit(e)}>
                      <Grid container spacing={2}>
                        {calculateWorth && (
                          <Grid item xs={3}>
                            <FormControl fullWidth variant="outlined">
                              <Select
                                id="item-worth-input"
                                value={itemWorth}
                                onChange={(e) => setItemWorth(e.target.value)}
                              >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                        )}
                        <Grid item xs={calculateWorth ? 9 : 12}>
                          <TextField
                            label="Item Name"
                            variant="outlined"
                            fullWidth
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
                </animated.div>
              )
          )}
        </Modal>
      )}
    </>
  );
};
