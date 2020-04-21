import React from "react";
import "./App.css";

import { Router } from "@reach/router";
import {
  HomePage,
  TodoListDetailPage,
  LoginPage,
  ProfilePage,
  ManageUsersPage,
} from "./pages";

import { useQuery } from "@apollo/react-hooks";
import { ME_QUERY } from "./gql";

import { PrimaryLayout, Loading, Error } from "./components/Global";

export const CurrentUserContext = React.createContext();

function App() {
  const { data, loading, error } = useQuery(ME_QUERY, {
    fetchPolicy: "network-only",
  });

  let userContext = {};
  if (data) {
    userContext = {
      id: data.me.id,
      username: data.me.username,
      email: data.me.email,
      isStaff: data.me.isStaff,
      isSuperuser: data.me.isSuperuser,
    };
  }

  return (
    <CurrentUserContext.Provider value={userContext}>
      <PrimaryLayout>
        {loading && <Loading />}
        {error && <Error errorMessage={error.message} />}
        <Router>
          <HomePage path="/" />
          <LoginPage path="login/" />
          <ProfilePage path="profile/" />
          <TodoListDetailPage path="todolist/:id/" />
          <ManageUsersPage path="manageusers/" />
        </Router>
      </PrimaryLayout>
    </CurrentUserContext.Provider>
  );
}

export default App;
