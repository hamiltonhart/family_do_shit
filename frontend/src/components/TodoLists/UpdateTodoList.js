import React, { useState } from "react";
import { useParams } from "@reach/router";

import { useMutation } from "@apollo/react-hooks";
import { UPDATE_TODO_LIST } from "../../gql/TodoListGQL";

import {
  makeStyles,
  TextField,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

import { Error } from "../Global";
import { UpdateTodoListButtons } from "./UpdateTodoListButtons";
import { Modal, ModalContent } from "../Global/Modal";

const useStyles = makeStyles((theme) => ({
  headingContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: theme.spacing(3),
  },
  formContainer: {
    marginBottom: theme.spacing(3),
  },
  title: {
    textTransform: "uppercase",
  },
  textInput: {
    marginRight: theme.spacing(1),
  },
  submit: {
    marginLeft: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

export const UpdateTodoList = ({
  title,
  calculateWorth,
  toggle,
  toggleEditButton,
}) => {
  const params = useParams();
  const [newTitle, setNewTitle] = useState(title);
  const [newCalculateWorth, setNewCalculateWorth] = useState(calculateWorth);

  const [updateTodoList, { error }] = useMutation(UPDATE_TODO_LIST);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodoList({
      variables: {
        id: params.id,
        title: newTitle,
        calculateWorth: newCalculateWorth,
      },
      onCompleted: handleEditClose(),
    });
  };

  const handleEditClose = () => {
    setNewTitle(title);
    setNewCalculateWorth(calculateWorth);
    toggleEditButton();
    toggle();
  };

  const classes = useStyles();
  return (
    <>
      {error && <Error errorMessage={error.message} />}
      <Modal>
        <ModalContent toggle={() => handleEditClose()}>
          <div className={classes.formContainer}>
            <form
              className={classes.headingContainer}
              onSubmit={(e) => handleSubmit(e)}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <TextField
                    className="textInput"
                    color="primary"
                    variant="outlined"
                    label="List Name"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    fullWidth
                    autoFocus
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={newCalculateWorth}
                        onChange={(e) =>
                          setNewCalculateWorth(!newCalculateWorth)
                        }
                        color="primary"
                      />
                    }
                    label="Include Item Worth"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    color="primary"
                    type="submit"
                    variant="contained"
                    fullWidth
                  >
                    Update
                  </Button>
                </Grid>
              </Grid>
            </form>
            <UpdateTodoListButtons toggle={handleEditClose} />
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};
