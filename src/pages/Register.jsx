import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { backendUrl } from "../../http";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitUser = (e) => {
    e.preventDefault();
    let user = { username, password };

    fetch(`${backendUrl}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        navigate("/login");
      })
      .catch((e) => {
        alert("incorrect details!, please enter correct details.");
      });

    setUsername("");
    setPassword("");
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={submitUser} style={{ width: "300px" }}>
        <Typography variant="h6">Register</Typography>
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
          Register
        </Button>
        <Box mt={2}>
          <Typography>
            Already have an account? <Link to="/login">Login here</Link>
          </Typography>
        </Box>
      </form>
    </Box>
  );
}
