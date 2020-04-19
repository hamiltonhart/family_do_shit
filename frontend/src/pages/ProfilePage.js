import React, { useContext } from "react";

import { CurrentUserContext } from "../App";
import { Typography } from "@material-ui/core";

export const ProfilePage = () => {
  const userContext = useContext(CurrentUserContext);
  return (
    <Typography variant="h4" align="center">
      {userContext.username}
    </Typography>
  );
};
