import React, { useState } from "react";

import {
  Backdrop,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

export const Error = ({ errorMessage }) => {
  const [open, setOpen] = useState(true);

  return (
    <Backdrop open={open}>
      <Dialog open={open}>
        <DialogTitle>An Error Occured</DialogTitle>
        <DialogContent>
          <DialogContentText>{errorMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(!open)}>Close</Button>
          <Button color="primary" onClick={() => window.location.reload()}>
            Reload
          </Button>
        </DialogActions>
      </Dialog>
    </Backdrop>
  );
};
