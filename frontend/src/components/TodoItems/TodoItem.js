import React from "react";
import { useParams } from "@reach/router";

import { useMutation } from "@apollo/react-hooks";
import { MARK_TODO_ITEM_COMPLETE_INCOMPLETE } from "../../gql/TodoItemGQL";
import { GET_TODO_LIST } from "../../gql/TodoListGQL";

import { Error } from "../Global";
import { DeleteTodoItem } from "./DeleteTodoItem";

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
}));

export const TodoItem = ({ todoItem }) => {
  const params = useParams();
  const [markTodoItemCompleteIncomplete, { error }] = useMutation(
    MARK_TODO_ITEM_COMPLETE_INCOMPLETE
  );

  const handleCheck = () => {
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
            onChange={handleCheck}
            checked={todoItem.isCompleted}
          />
          <Typography
            className={todoItem.isCompleted ? classes.completed : ""}
            variant="body1"
            display="inline"
          >
            {todoItem.itemName}
          </Typography>
        </span>
        <CardActions>
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
