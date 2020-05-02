import React from "react";
import { useParams } from "@reach/router";

import { useQuery } from "@apollo/react-hooks";
import { GET_TODO_LIST } from "../gql/TodoListGQL";

import { makeStyles, Typography, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";

import { useToggle } from "../utilities";
import { Loading, Error } from "../components/Global";
import { CreateTodoItem } from "../components/TodoItems";
import { TodoItemList } from "../components/TodoItems";
import { UpdateTodoList } from "../components/TodoLists";

const useStyles = makeStyles((theme) => ({
  listContainer: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  headingContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minHeight: "55px",
    "& h5": {
      cursor: "pointer",
    },
  },
  title: {
    textTransform: "uppercase",
  },
}));

export const TodoListDetailPage = () => {
  const params = useParams();
  const { isShowing: isShowingListEdit, toggle: toggleListEdit } = useToggle();
  const {
    isShowing: isShowingListEditButton,
    toggle: toggleListEditButton,
  } = useToggle();

  const { data, loading, error } = useQuery(GET_TODO_LIST, {
    variables: { id: params.id },
  });

  const handleListEditOpen = () => {
    toggleListEdit();
  };

  const classes = useStyles();
  return (
    <div>
      {loading && <Loading />}
      {error && <Error errorMessage={error.message} />}
      {data && (
        <>
          <div className={classes.headingContainer}>
            <Typography
              variant="h5"
              className={classes.title}
              gutterBottom
              onClick={toggleListEditButton}
            >
              {data.todoList.title}
            </Typography>
            {isShowingListEditButton && (
              <IconButton onClick={() => handleListEditOpen()}>
                <EditIcon />
              </IconButton>
            )}
          </div>
          <div className={classes.listContainer}>
            <CreateTodoItem
              todoListId={data.todoList.id}
              calculateWorth={data.todoList.calculateWorth}
            />
            <TodoItemList
              todoItems={data.todoList.todoItems}
              calculateWorth={data.todoList.calculateWorth}
            />
          </div>
          {isShowingListEdit && (
            <UpdateTodoList
              title={data.todoList.title}
              calculateWorth={data.todoList.calculateWorth}
              toggle={toggleListEdit}
              toggleEditButton={toggleListEditButton}
            />
          )}
        </>
      )}
    </div>
  );
};
