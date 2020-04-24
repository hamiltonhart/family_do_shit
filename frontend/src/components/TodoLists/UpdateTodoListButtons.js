import React, { useState } from "react";

import { DeleteTodoList } from "./DeleteTodoList";
import { Grid, Button } from "@material-ui/core";

export const UpdateTodoListButtons = ({ toggle }) => {
  const [deleteActive, setDeleteActive] = useState(false);

  return (
    <Grid container spacing={1}>
      <Grid item xs={6}>
        <DeleteTodoList isActive={deleteActive} setIsActive={setDeleteActive} />
      </Grid>
      <Grid item xs={6}>
        <Button variant="contained" fullWidth onClick={toggle}>
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};
