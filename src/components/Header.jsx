import { Box, Button, Typography } from "@mui/material";
// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null);
    window.location.reload();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "lightgray",
        marginBottom: "2rem",
      }}
    >
      <Typography>
        {user ? `Welcome ${user.username}` : "Login to our site"}
      </Typography>
      {user ? <Button onClick={handleLogout}>Logout</Button> : <Box></Box>}
    </Box>
  );
}
