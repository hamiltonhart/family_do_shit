import React from "react";
import { navigate, useParams } from "@reach/router";

import { useMutation } from "@apollo/react-hooks";
import { DELETE_TODO_LIST, GET_TODO_LISTS } from "../../gql";

import { Button, ClickAwayListener } from "@material-ui/core";

import { Error } from "../Global";

export const DeleteTodoList = ({ isActive, setIsActive }) => {
  const params = useParams();
  const [deleteTodoList, { error }] = useMutation(DELETE_TODO_LIST);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteTodoList({
      variables: { id: params.id },
      refetchQueries: [{ query: GET_TODO_LISTS }],
      onCompleted: handleCompleted(),
    });
  };

  const handleCompleted = () => {
    navigate("/");
  };
  return (
    <>
      {error && <Error errorMessage={error.message} />}
      {isActive ? (
        <ClickAwayListener onClickAway={() => setIsActive(!isActive)}>
          <Button
            type="medium"
            variant="contained"
            color="secondary"
            fullWidth
            onClick={(e) => handleDelete(e)}
          >
            Delete
          </Button>
        </ClickAwayListener>
      ) : (
        <Button
          type="medium"
          variant="outlined"
          fullWidth
          onClick={(e) => setIsActive(!isActive)}
        >
          Delete
        </Button>
      )}
    </>
  );
};
