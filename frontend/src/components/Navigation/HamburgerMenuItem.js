import React from "react";
import { Link } from "@reach/router";

import { Paper, Typography } from "@material-ui/core";

export const HamburgerMenuItem = ({ content, linkTo, toggle }) => {
  return (
    <li>
      <Paper component={Link} to={linkTo} variant="outlined" onClick={toggle}>
        <Typography variant="h6">{content}</Typography>
      </Paper>
    </li>
  );
};
