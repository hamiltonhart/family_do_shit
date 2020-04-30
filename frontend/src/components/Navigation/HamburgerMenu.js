import React from "react";

import { makeStyles, IconButton, Paper } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { useTransition, animated } from "react-spring";

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
    boxShadow: theme.shadows[10],
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

  const transitions = useTransition(isShowing, null, {
    from: {
      position: "absolute",
      transform: "translate3d(500px, 0, 0)",
      top: 0,
      right: 0,
      zIndex: 100,
    },
    enter: { transform: "translate3d(0, 0, 0)" },
    leave: { transform: "translate3d(500px, 0, 0)" },
  });

  const backgroundTransitions = useTransition(isShowing, null, {
    from: {
      position: "fixed",
      zIndex: 99,
      width: "100vw",
      height: "100vh",
      top: 0,
      left: 0,
      backgroundColor: "rgba(0, 0, 0, .5)",
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  });

  const classes = useStyles();
  return (
    <div>
      <IconButton onClick={toggle}>
        <MenuIcon className={classes.menuIcon} />
      </IconButton>
      {backgroundTransitions.map(
        ({ item, key, props }) =>
          item && <animated.div key={key} style={props} />
      )}
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
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
            </animated.div>
          )
      )}
    </div>
  );
};
