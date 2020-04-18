import React from "react";
import { Link } from "@reach/router";

import { makeStyles, Paper, Typography } from "@material-ui/core";

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
    marginTop: 0,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    borderRadius: 0,
  },
  heading: {
    display: "block",
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
            color="primary"
            component={Link}
            to="/"
          >
            Do Shit
          </Typography>
        </Paper>
        <div className={classes.childrenDiv}>{props.children}</div>
      </Paper>
    </>
  );
};
