import React from "react";

import { useMutation } from "@apollo/react-hooks";
import { DELETE_TODO_ITEM, GET_TODO_LIST } from "../../gql";

import { IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";

import { Error } from "../Global";

export const DeleteTodoItem = ({ id, todoListId }) => {
  const [deleteTodoItem, { error }] = useMutation(DELETE_TODO_ITEM);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteTodoItem({
      variables: { id: id },
      refetchQueries: [{ query: GET_TODO_LIST, variables: { id: todoListId } }],
    });
  };

  return (
    <>
      {error && <Error errorMessage={error.message} />}
      <IconButton onClick={(e) => handleDelete(e)}>
        <CancelIcon />
      </IconButton>
    </>
  );
};
