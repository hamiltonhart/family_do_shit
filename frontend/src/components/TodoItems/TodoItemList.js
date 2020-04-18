import React from "react";

import { makeStyles, Grid, Button } from "@material-ui/core";

import { TodoItem } from "./TodoItem";
import { useSortCompleted } from "./utilities";
import { useToggle } from "../../utilities";

const useStyles = makeStyles((theme) => ({
  incompleteList: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  showCompleted: {
    display: "flex",
    justifyContent: "center",
  },
}));

export const TodoItemList = ({ todoItems }) => {
  const [completeItems, incompleteItems] = useSortCompleted(todoItems);
  const { isShowing, toggle } = useToggle();

  const classes = useStyles();

  return (
    <>
      <Grid container className={classes.incompleteList}>
        {incompleteItems.map((item) => (
          <Grid item key={item.id} xs={12}>
            <TodoItem todoItem={item} />
          </Grid>
        ))}
      </Grid>
      <Grid container>
        <Grid item xs={12} className={classes.showCompleted}>
          <Button color="secondary" onClick={toggle}>
            {isShowing ? "Hide Completed" : "Show Completed"}
          </Button>
        </Grid>
        {isShowing && (
          <>
            {completeItems.map((item) => (
              <Grid item key={item.id} xs={12}>
                <TodoItem todoItem={item} />
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </>
  );
};
