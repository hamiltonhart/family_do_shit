import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Login } from "./components/Auth/Login";
import { PrimaryLayout } from "./components/Global";
import * as serviceWorker from "./serviceWorker";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styling/theme";

import { useQuery, ApolloProvider } from "@apollo/react-hooks";
import ApolloClient, { gql } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";

const cache = new InMemoryCache();

const uri = "http://localhost:8000/graphql/";

export const client = new ApolloClient({
  cache,
  uri,
  fetchOptions: {
    credentials: "include",
  },
  request: (operation) => {
    const token = localStorage.getItem("authToken") || "";
    operation.setContext({
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
  },
  clientState: {
    defaults: {
      isLoggedIn: !!localStorage.getItem("authToken"),
    },
  },
});

export const IS_LOGGED_IN = gql`
  {
    isLoggedIn @client
  }
`;

const InitialLogin = () => {
  const { data } = useQuery(IS_LOGGED_IN);
  return (
    <>
      {data && data.isLoggedIn ? (
        <App />
      ) : (
        <PrimaryLayout>
          <Login />
        </PrimaryLayout>
      )}
    </>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <InitialLogin />
    </ThemeProvider>
  </ApolloProvider>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
