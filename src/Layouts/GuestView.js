import React from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function GuestView() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "Center",
      }}
    >
      <Typography variant="h1"> Hello there! Welcome to AFOTE </Typography>
      <Typography variant="h2">To use our app please login</Typography>
      <Button
      sx={{ margin: "10px" , padding: "10px" , fontSize: "20px" , width: "200px" , height: "50px"}}
        onClick={() => navigate("/login")}
        variant="outlined"
        color="primary"
      >
        Login
      </Button>
    </div>
  );
}
