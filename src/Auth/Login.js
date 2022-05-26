import React, { useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

// import classes from "./Login.module.css";
// import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import swal from "sweetalert";
import { API } from "../API/API";

// const API = process.env.REACT_APP_API;

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "50px 0",
    justifyContent: "center",
  },

  paper: {
    margin: theme.spacing(5, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const classes = useStyles();
  const [email, setemail] = useState();
  const [password, setPassword] = useState();
  console.log("login", email, password);

  // const history = useHistory();

  async function loginUser(userdata) {
    return fetch(`${API}/admin/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    }).then((data) => data.json());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser({
      email,
      password,
    });
    console.log("response", response);
    if ("access_token" in response.data) {
      swal("Success", response.message, "success", {
        buttons: false,
        timer: 2000,
      }).then((value) => {
        localStorage.setItem("access_token", response.data["access_token"]);
        localStorage.setItem("email", response.data["email"]);
        window.location.href = "/location";
      });
    } else {
      swal("Failed", response.message, "error");
    }
  };

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={12} md={5} component={Paper} elevation={12} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                onChange={(e) => setemail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                name="password"
                label="Password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
