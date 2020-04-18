import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { GET_TODO_LISTS } from "../gql/TodoListGQL";

import { makeStyles, Grid } from "@material-ui/core";

import { TodoListsList, CreateTodoList } from "../components/TodoLists";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

export const HomePage = () => {
  const { data, loading, error } = useQuery(GET_TODO_LISTS);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      {loading && <h2>Loading...</h2>}
      {error && <h2>Error</h2>}
      {data && (
        <Grid container>
          <Grid item xs={12}>
            <CreateTodoList />
          </Grid>
          <Grid item xs={12}>
            <TodoListsList todoLists={data.todoLists} />
          </Grid>
        </Grid>
      )}
    </div>
  );
};
