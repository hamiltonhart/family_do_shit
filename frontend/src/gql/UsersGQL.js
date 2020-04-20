import { gql } from "apollo-boost";

// Queries

export const ME_QUERY = gql`
  query {
    me {
      id
      username
      isSuperuser
      isStaff
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      id
      username
      email
      isStaff
      isSuperuser
      isActive
    }
  }
`;

export const GET_USER = gql`
  query($id: Int!) {
    user(id: $id) {
      id
      username
      email
      isStaff
      isSuperuser
      isActive
    }
  }
`;

// Mutations

export const CREATE_USER = gql`
  mutation(
    $username: String!
    $email: String!
    $password: String!
    $isStaff: Boolean
    $isSuperuser: Boolean
  ) {
    createUser(
      username: $username
      email: $email
      password: $password
      isStaff: $isStaff
      isSuperuser: $isSuperuser
    ) {
      user {
        id
        username
        email
        isStaff
        isSuperuser
        isActive
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation(
    $id: Int!
    $username: String
    $email: String
    $password: String
    $isStaff: Boolean
    $isSuperuser: Boolean
  ) {
    updateUser(
      id: $id
      username: $username
      email: $email
      password: $password
      isStaff: $isStaff
      isSuperuser: $isSuperuser
    ) {
      user {
        id
        username
        email
        isStaff
        isSuperuser
        isActive
      }
    }
  }
`;

export const TOGGLE_ACTIVE_USER = gql`
  mutation($id: Int!) {
    activeUserToggle(id: $id) {
      user {
        id
        username
        email
        isStaff
        isSuperuser
        isActive
      }
    }
  }
`;
