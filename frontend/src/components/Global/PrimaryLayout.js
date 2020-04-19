import React from "react";
import { Link } from "@reach/router";

import { makeStyles, Paper, Typography } from "@material-ui/core";

import { MenuItems } from "../Navigation";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    margin: 0,
    padding: theme.spacing(0),
    borderRadius: 0,
    width: "100%",
    height: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 0,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
  },
  heading: {
    display: "block",
    color: theme.palette.common.white,
  },
  childrenDiv: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(3),
  },
}));

export const PrimaryLayout = (props) => {
  const classes = useStyles();
  return (
    <>
      <Paper className={classes.root} elevation={0}>
        <Paper className={classes.header}>
          <Typography
            className={classes.heading}
            variant="h4"
            component={Link}
            to="/"
          >
            Do Shit
          </Typography>
          <MenuItems />
        </Paper>
        <div className={classes.childrenDiv}>{props.children}</div>
      </Paper>
    </>
  );
};
