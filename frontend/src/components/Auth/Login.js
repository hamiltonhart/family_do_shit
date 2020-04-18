import React, { useState } from "react";
import { navigate } from "@reach/router";

import {
  makeStyles,
  Paper,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

import { LOGIN_MUT } from "../../gql";
import { useMutation, useApolloClient } from "@apollo/react-hooks";

import { Error } from "../Global";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
}));

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [tokenAuth, { error }] = useMutation(LOGIN_MUT);
  const client = useApolloClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await tokenAuth({
      variables: { username, password },
      onCompleted: loginCompleted(),
    });
    localStorage.setItem("authToken", res.data.tokenAuth.token);
    client.writeData({ data: { isLoggedIn: true } });
    navigate("/");
  };

  const loginCompleted = () => {
    setUsername("");
    setPassword("");
  };

  const classes = useStyles();

  return (
    <>
      <Paper className={classes.root}>
        <Typography variant="h3">Login</Typography>
        <form className={classes.loginForm} onSubmit={(e) => handleSubmit(e)}>
          <TextField
            color="primary"
            variant="outlined"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            color="primary"
            type="password"
            variant="outlined"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
          >
            Login
          </Button>
        </form>
      </Paper>
      {error && <Error errorMessage={error.message} />}
    </>
  );
};
