import React from "react";
import { useParams } from "@reach/router";

import { useMutation } from "@apollo/react-hooks";
import { MARK_TODO_ITEM_COMPLETE_INCOMPLETE } from "../../gql/TodoItemGQL";
import { GET_TODO_LIST } from "../../gql/TodoListGQL";

import { Error } from "../Global";
import { DeleteTodoItem } from "./DeleteTodoItem";

import { useToggle } from "../../utilities";

import {
  makeStyles,
  Paper,
  Checkbox,
  Typography,
  ClickAwayListener,
  CardActions,
  IconButton,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { EditTodoItem } from "./EditTodoItem";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  paperContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(1),
    cursor: "pointer",
    minHeight: "64px",
    padding: theme.spacing(1),
  },
  paperDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    position: "relative",
    minHeight: "64px",
  },
  todoContent: {
    display: "flex",
    alignItems: "center",
  },
  completed: {
    textDecoration: "line-through",
  },
  completedBy: {
    fontStyle: "italic",
    color: theme.palette.grey[500],
    fontSize: ".85em",
  },
  completedByWrapper: {
    width: "100%",
  },
  showActions: {
    opacity: 1,
    backgroundColor: theme.palette.primary.main,
    position: "absolute",
    right: -8,
    borderRadius: "0 3px 3px 0",
    height: "100%",
    zIndex: 1,
  },
}));

export const TodoItem = ({ todoItem }) => {
  const params = useParams();
  const {
    isShowing: isShowingEditButtons,
    toggle: toggleEditButtons,
  } = useToggle();
  const {
    isShowing: isShowingEditModal,
    toggle: toggleEditModal,
  } = useToggle();
  const [markTodoItemCompleteIncomplete, { error }] = useMutation(
    MARK_TODO_ITEM_COMPLETE_INCOMPLETE
  );

  const handleCheck = (e) => {
    e.stopPropagation();
    markTodoItemCompleteIncomplete({
      variables: { id: todoItem.id },
      refetchQueries: [{ query: GET_TODO_LIST, variables: { id: params.id } }],
    });
  };

  const handleOpenEditModal = () => {
    toggleEditModal();
    toggleEditButtons();
  };

  const handleClickAway = () => {
    if (isShowingEditButtons) {
      toggleEditButtons();
    }
  };

  const classes = useStyles();
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={classes.root}>
        <Paper
          className={classes.paperContainer}
          elevation={0}
          variant="outlined"
        >
          {error && <Error errorMessage={error.message} />}
          <div className={classes.paperDiv}>
            <div className={classes.todoContent}>
              <Checkbox
                color="primary"
                onChange={(e) => handleCheck(e)}
                checked={todoItem.isCompleted}
              />
              <Typography
                className={todoItem.isCompleted ? classes.completed : ""}
                variant="body1"
                display="inline"
                onClick={toggleEditButtons}
              >
                {todoItem.itemName}
              </Typography>
            </div>

            {isShowingEditButtons && (
              <CardActions className={classes.showActions}>
                <IconButton onClick={(e) => handleOpenEditModal(e)}>
                  <EditIcon />
                </IconButton>
                <DeleteTodoItem id={todoItem.id} todoListId={params.id} />
              </CardActions>
            )}
            {isShowingEditModal && (
              <EditTodoItem
                toggleEditModal={toggleEditModal}
                todoItem={todoItem}
              />
            )}
          </div>
        </Paper>
        {todoItem.completedBy && (
          <Typography
            className={classes.completedBy}
            align="center"
          >{`Compeleted By: ${todoItem.completedBy.username}`}</Typography>
        )}
      </div>
    </ClickAwayListener>
  );
};
