import React from "react";
import { useParams } from "@reach/router";

import { useQuery } from "@apollo/react-hooks";
import { GET_TODO_LIST } from "../gql/TodoListGQL";

import { makeStyles } from "@material-ui/core";

import { Loading, Error } from "../components/Global";
import { TodoListActions } from "../components/TodoLists";
import { TodoItemList } from "../components/TodoItems";

const useStyles = makeStyles((theme) => ({
  listContainer: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  headingContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: theme.spacing(3),
  },
  title: {
    textTransform: "uppercase",
  },
}));

export const TodoListDetailPage = () => {
  const params = useParams();

  const { data, loading, error } = useQuery(GET_TODO_LIST, {
    variables: { id: params.id },
  });

  const classes = useStyles();
  return (
    <div>
      {loading && <Loading />}
      {error && <Error errorMessage={error.message} />}
      {data && (
        <div className={classes.listContainer}>
          <TodoListActions title={data.todoList.title} todoListId={params.id} />
          <TodoItemList todoItems={data.todoList.todoItems} />
        </div>
      )}
    </div>
  );
};
