import React from "react";

import { makeStyles, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  menuIcon: {
    transform: "scale(1.5)",
  },
}));

export const HamburgerMenu = () => {
  const classes = useStyles();
  return (
    <IconButton>
      <MenuIcon className={classes.menuIcon} />
    </IconButton>
  );
};
