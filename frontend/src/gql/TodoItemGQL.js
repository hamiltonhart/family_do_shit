import { gql } from "apollo-boost";

// Queries

export const GET_TODO_ITEMS = gql`
  query {
    todoItems {
      id
      itemName
      itemWorth
      isCompleted
      todoList {
        id
        title
      }
      completedDate
      completedBy {
        id
        username
      }
    }
  }
`;

export const GET_TODO_ITEM = gql`
  query($id: Int!) {
    todoItem(id: $id) {
      id
      itemName
      itemWorth
      isCompleted
      completedDate
      completedBy {
        id
        username
      }
    }
  }
`;

// Mutations

export const CREATE_TODO_ITEM = gql`
  mutation($itemName: String!, $todoListId: Int!, $itemWorth: Int) {
    createTodoItem(
      itemName: $itemName
      todoListId: $todoListId
      itemWorth: $itemWorth
    ) {
      todoItem {
        id
        itemName
        createdBy {
          username
        }
        createdDate
        completedDate
        completedBy {
          id
          username
        }
      }
    }
  }
`;

export const UPDATE_TODO_ITEM = gql`
  mutation($id: Int!, $itemName: String, $todoListId: Int, $itemWorth: Int) {
    updateTodoItem(
      id: $id
      itemName: $itemName
      todoListId: $todoListId
      itemWorth: $itemWorth
    ) {
      todoItem {
        id
        itemName
        createdBy {
          username
        }
        createdDate
        completedDate
        completedBy {
          id
          username
        }
      }
    }
  }
`;

export const DELETE_TODO_ITEM = gql`
  mutation($id: Int!) {
    deleteTodoItem(id: $id) {
      id
    }
  }
`;

export const MARK_TODO_ITEM_COMPLETE_INCOMPLETE = gql`
  mutation($id: Int!) {
    markTodoItemCompleteIncomplete(id: $id) {
      todoItem {
        id
        itemName
        createdBy {
          username
        }
        createdDate
        completedDate
        completedBy {
          id
          username
        }
      }
    }
  }
`;
