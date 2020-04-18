import React from "react";
import { makeStyles, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px;",
  },
});

export const Loading = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.root} color="primary" />
    </div>
  );
};
