import React from "react";

import {
  makeStyles,
  IconButton,
  Paper,
  ClickAwayListener,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { useToggle } from "../../utilities";
import { HamburgerMenuItemList } from "./HamburgerMenuItemList";
import { Logout } from "../Auth";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  menuIcon: {
    transform: "scale(1.5)",
  },
  menuWrapper: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 100,
    height: "100vh",
    minWidth: "250px",
    maxWidth: "300px",
    borderRadius: 0,
    boxShadow: theme.shadows[4],
  },
  menuWrapperTopActions: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(2),
  },
  logout: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: "20px",
    width: "100%",
  },
}));

export const HamburgerMenu = () => {
  const { isShowing, toggle } = useToggle();

  const classes = useStyles();
  return (
    <div>
      <IconButton onClick={toggle}>
        <MenuIcon className={classes.menuIcon} />
      </IconButton>
      {isShowing && (
        <ClickAwayListener onClickAway={toggle}>
          <Paper className={classes.menuWrapper}>
            <div className={classes.menuWrapperTopActions}>
              <IconButton onClick={toggle}>
                <ArrowForwardIosIcon />
              </IconButton>
            </div>
            <HamburgerMenuItemList toggle={toggle} />
            <div className={classes.logout}>
              <Logout />
            </div>
          </Paper>
        </ClickAwayListener>
      )}
    </div>
  );
};
