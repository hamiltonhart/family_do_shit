import React from "react";

import { Button } from "@material-ui/core";

import { useApolloClient } from "@apollo/react-hooks";

export const Logout = () => {
  const client = useApolloClient();
  const userLogout = () => {
    localStorage.removeItem("authToken");
    client.writeData({ data: { isLoggedIn: false } });
  };
  return (
    <Button fullWidth onClick={() => userLogout()}>
      Logout
    </Button>
  );
};
