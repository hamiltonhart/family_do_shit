import React from "react";

import { useQuery } from "@apollo/react-hooks";
import { GET_USERS } from "../../gql";

import { Loading, Error } from "../Global";
import { ManageUsersHeading } from "./ManageUsersHeading";

import {
  makeStyles,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import RemoveIcon from "@material-ui/icons/Remove";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    maxWidth: "500px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  table: {
    maxWidth: "100%",
    marginTop: theme.spacing(2),
    "& th": {
      fontWeight: "600",
    },
  },
  tableBody: {
    "& tr": {
      backgroundColor: theme.palette.grey[700],
      cursor: "pointer",
    },
  },
  inactiveUser: {
    "& th, td": {
      textDecoration: "italic",
      color: theme.palette.grey[400],
    },
  },
}));

export const AdminUserList = () => {
  const { data, error, loading } = useQuery(GET_USERS);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ManageUsersHeading />
      {loading && <Loading />}
      {error && <Error errorMessage={error.message} />}
      {data && (
        <TableContainer className={classes.table} component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Admin</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={classes.tableBody}>
              {data.users.map((user) => (
                <TableRow
                  key={user.id}
                  className={user.isActive ? "" : classes.inactiveUser}
                  onClick={() => console.log(`${user.username} clicked`)}
                >
                  <TableCell component="th" scope="row">
                    {user.username}
                  </TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                  <TableCell align="right">
                    {user.isSuperuser ? <CheckIcon /> : <RemoveIcon />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
