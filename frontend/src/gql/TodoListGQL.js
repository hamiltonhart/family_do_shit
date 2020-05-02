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
      calculateWorth
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
  mutation($title: String!, $calculateWorth: Boolean) {
    createTodoList(title: $title, calculateWorth: $calculateWorth) {
      todoList {
        id
        title
        calculateWorth
      }
    }
  }
`;

export const UPDATE_TODO_LIST = gql`
  mutation($id: Int!, $title: String!, $calculateWorth: Boolean) {
    updateTodoList(id: $id, title: $title, calculateWorth: $calculateWorth) {
      todoList {
        id
        title
        calculateWorth
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
