import React, { useContext } from "react";
import { navigate } from "@reach/router";

import { CurrentUserContext } from "../App";
import { Typography } from "@material-ui/core";

export const ManageUsersPage = () => {
  const { isSuperuser } = useContext(CurrentUserContext);

  return (
    <>
      {isSuperuser ? (
        <Typography variant="h4" align="center">
          Manage Users
        </Typography>
      ) : (
        <Typography variant="h4" align="center" onChange={navigate("/")}>
          Redirecting...
        </Typography>
      )}
    </>
  );
};
