import React, { useContext } from "react";

import { useQuery } from "@apollo/react-hooks";
import { GET_TODO_LISTS } from "../gql/TodoListGQL";

import { makeStyles, Grid, Typography, Button } from "@material-ui/core";

import { TodoListsList, CreateTodoList } from "../components/TodoLists";
import { CurrentUserContext } from "../App";

import { Error, Loading } from "../components/Global";
import { useToggle } from "../utilities";

const useStyles = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

export const HomePage = () => {
  const { isShowing, toggle } = useToggle();
  const { data, loading, error } = useQuery(GET_TODO_LISTS);

  const userContext = useContext(CurrentUserContext);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center" gutterBottom>
        {userContext.username}
      </Typography>
      {error && <Error errorMessage={error.message} />}

      <Grid container>
        <Grid item xs={12}>
          <Button
            size="medium"
            color="primary"
            variant="contained"
            fullWidth
            onClick={toggle}
          >
            Create List
          </Button>
        </Grid>
        {data && (
          <>
            {loading && <Loading />}
            <Grid item xs={12}>
              <TodoListsList todoLists={data.todoLists} />
            </Grid>
          </>
        )}
      </Grid>
      {isShowing && <CreateTodoList modalToggle={toggle} />}
    </div>
  );
};
