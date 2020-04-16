import { gql } from "apollo-boost";

// Queries

export const GET_TODO_LISTS = gql`
  query {
    todoLists {
      id
      title
    }
  }
`;

export const GET_TODO_LIST = gql`
  query($id: Int!) {
    todoList(id: $id) {
      id
      title
      todoItems {
        id
        itemName
        itemWorth
        isCompleted
        completedBy {
          id
          username
        }
        completedDate
      }
    }
  }
`;

// Mutations

export const CREATE_TODO_LIST = gql`
  mutation($title: String!) {
    createTodoList(title: $title) {
      todoList {
        id
        title
      }
    }
  }
`;

export const UPDATE_TODO_LIST = gql`
  mutation($id: Int!, $title: String!) {
    updateTodoList(id: $id, title: $title) {
      todoList {
        id
        title
      }
    }
  }
`;

export const DELETE_TODO_LIST = gql`
  mutation($id: Int!) {
    deleteTodoList(id: $id) {
      id
    }
  }
`;
