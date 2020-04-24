import React from "react";
import { useParams } from "@reach/router";

import { useMutation } from "@apollo/react-hooks";
import { MARK_TODO_ITEM_COMPLETE_INCOMPLETE } from "../../gql/TodoItemGQL";
import { GET_TODO_LIST } from "../../gql/TodoListGQL";

import { Error } from "../Global";
import { DeleteTodoItem } from "./DeleteTodoItem";
import { EditTodoItem } from "./EditTodoItem";

import { useToggle } from "../../utilities";

import {
  makeStyles,
  Paper,
  Checkbox,
  Typography,
  CardActions,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(1),
    cursor: "pointer",
  },
  paperDiv: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  completed: {
    textDecoration: "line-through",
  },
  completedBy: {
    fontStyle: "italic",
    color: theme.palette.grey[500],
    fontSize: ".85em",
  },
  showActions: {
    opacity: 1,
  },
  hideActions: {
    opacity: 0,
  },
}));

export const TodoItem = ({ todoItem }) => {
  const params = useParams();
  const { isShowing, toggle } = useToggle();
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

  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={0} variant="outlined">
      {error && <Error errorMessage={error.message} />}
      <div className={classes.paperDiv}>
        <span>
          <Checkbox
            color="primary"
            onChange={(e) => handleCheck(e)}
            checked={todoItem.isCompleted}
          />
          <Typography
            className={todoItem.isCompleted ? classes.completed : ""}
            variant="body1"
            display="inline"
            fullWidth
            onClick={toggle}
          >
            {todoItem.itemName}
          </Typography>
        </span>

        <CardActions
          className={isShowing ? classes.showActions : classes.hideActions}
        >
          <EditTodoItem todoItem={todoItem} />
          <DeleteTodoItem id={todoItem.id} todoListId={params.id} />
        </CardActions>
      </div>
      {todoItem.completedBy && (
        <Typography
          className={classes.completedBy}
        >{`Compeleted By: ${todoItem.completedBy.username}`}</Typography>
      )}
    </Paper>
  );
};
