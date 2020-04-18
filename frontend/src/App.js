import React from "react";
import "./App.css";

import { Router } from "@reach/router";
import { HomePage, TodoListDetailPage, LoginPage } from "./pages";

import { useQuery } from "@apollo/react-hooks";
import { ME_QUERY } from "./gql";

import { PrimaryLayout } from "./components/Global";

export const CurrentUserContext = React.createContext();

function App() {
  const { data, loading, error } = useQuery(ME_QUERY);

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
        <Router>
          <HomePage path="/" />
          <LoginPage path="login/" />
          <TodoListDetailPage path="todolist/:id/" />
        </Router>
      </PrimaryLayout>
    </CurrentUserContext.Provider>
  );
}

export default App;
