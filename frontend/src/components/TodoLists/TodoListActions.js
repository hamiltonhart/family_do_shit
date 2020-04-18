import React from "react";

import { UpdateTodoList } from "./UpdateTodoList";
import { CreateTodoItem } from "../TodoItems";
import { useToggle } from "../../utilities";

export const TodoListActions = ({ title, todoListId }) => {
  const { isShowing, toggle } = useToggle(true);
  return (
    <>
      <UpdateTodoList title={title} toggleCreateButton={toggle} />
      <CreateTodoItem todoListId={todoListId} createButtonShowing={isShowing} />
    </>
  );
};
