import React, { useContext, useEffect, useState } from "react";
import { backendUrl } from "../../http";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, handleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [handleLogin]);

  const submitUser = (e) => {
    e.preventDefault();
    let user = { username, password };

    fetch(`${backendUrl}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 404) {
          return alert("user not found!");
        } else if (res.status === 401) {
          return alert("incorrect details!");
        }
        handleLogin(res?.user);
      })
      .catch((e) => {
        console.log(e);
        alert("something went wrong!");
      });

    setUsername("");
    setPassword("");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={submitUser} style={{ width: "300px" }}>
        <Typography variant="h6">Login</Typography>
        <TextField
          type="text"
          id="username"
          name="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          type="password"
          id="password"
          name="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>

        <Box mt={2}>
          <Typography>
            Don't have an account? <Link to="/register">Register here</Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
}
