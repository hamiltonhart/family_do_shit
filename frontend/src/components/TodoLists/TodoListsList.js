import React from "react";
import { Link } from "@reach/router";

import { makeStyles, Grid, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  todoListContainer: {
    maxWidth: "100%",
  },
  todoList: {
    padding: theme.spacing(2),
  },
}));

export const TodoListsList = ({ todoLists }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.todoListContainer}>
      {todoLists.map((list) => (
        <Grid
          key={list.id}
          item
          xs={12}
          component={Link}
          to={`todolist/${list.id}`}
        >
          <Paper className={classes.todoList}>
            <Typography variant="h6" align="center">
              {list.title}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};
