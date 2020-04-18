import React from "react";
import "./App.css";

import { Router } from "@reach/router";
import { HomePage, TodoListDetailPage, LoginPage } from "./pages";
import { PrimaryLayout } from "./components/Global";

function App() {
  return (
    <PrimaryLayout>
      <Router>
        <HomePage path="/" />
        <LoginPage path="login/" />
        <TodoListDetailPage path="todolist/:id/" />
      </Router>
    </PrimaryLayout>
  );
}

export default App;
