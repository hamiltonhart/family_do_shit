import React, { useContext } from "react";

import { useQuery } from "@apollo/react-hooks";
import { GET_TODO_LISTS } from "../gql/TodoListGQL";

import { makeStyles, Grid, Typography } from "@material-ui/core";

import { TodoListsList, CreateTodoList } from "../components/TodoLists";
import { CurrentUserContext } from "../App";

import { Error, Loading } from "../components/Global";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

export const HomePage = () => {
  const { data, loading, error } = useQuery(GET_TODO_LISTS);

  const userContext = useContext(CurrentUserContext);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center" gutterBottom>
        {userContext.username}
      </Typography>
      {loading && <Loading />}
      {error && <Error errorMessage={error.message} />}
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
