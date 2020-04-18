import React, { useState } from "react";
import { useParams } from "@reach/router";

import { useMutation } from "@apollo/react-hooks";
import { UPDATE_TODO_LIST } from "../../gql/TodoListGQL";

import {
  makeStyles,
  Typography,
  TextField,
  ClickAwayListener,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";

import { useToggle } from "../../utilities";
import { Error } from "../Global";
import { UpdateTodoListButtons } from "./UpdateTodoListButtons";

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

export const UpdateTodoList = ({ title, toggleCreateButton }) => {
  const params = useParams();
  const [newTitle, setNewTitle] = useState(title);
  const { isShowing: isShowingEdit, toggle: toggleEdit } = useToggle();

  const [updateTodoList, { error }] = useMutation(UPDATE_TODO_LIST);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTodoList({
      variables: { id: params.id, title: newTitle },
      onCompleted: handleEditClick(),
    });
  };

  const handleClickAway = () => {
    setNewTitle(title);
    handleEditClick();
  };

  const handleEditClick = () => {
    toggleEdit();
    toggleCreateButton();
  };

  const classes = useStyles();
  return (
    <>
      {error && <Error errorMessage={error.message} />}
      {!isShowingEdit && (
        <div className={classes.headingContainer}>
          <Typography variant="h5" className={classes.title} gutterBottom>
            {title}
          </Typography>
          <IconButton color="secondary" onClick={handleEditClick}>
            <EditIcon />
          </IconButton>
        </div>
      )}
      {isShowingEdit && (
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className={classes.formContainer}>
            <form
              className={classes.headingContainer}
              onSubmit={(e) => handleSubmit(e)}
            >
              <TextField
                className="textInput"
                color="secondary"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                fullWidth
                autoFocus
              />

              <IconButton
                className={classes.submit}
                color="secondary"
                type="submit"
              >
                <DoneIcon />
              </IconButton>
            </form>
            <UpdateTodoListButtons toggle={handleEditClick} />
          </div>
        </ClickAwayListener>
      )}
    </>
  );
};
