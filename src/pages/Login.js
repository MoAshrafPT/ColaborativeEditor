import React, { useState,useEffect } from "react";
import "./LoginForm.css";
import { FaUserAstronaut, FaFacebook, FaGoogle } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
//import ForgetPassword from "../components/ForgetPassword";
import { TextField, Button } from "@mui/material";
import { FiLogIn } from "react-icons/fi";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function Login() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [files, setFiles] = useState([]);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [touchedUser, setTouchedUser] = React.useState(false);
  const [touchedPassword, setTouchedPassword] = React.useState(false);
  const [remember, setRemember] = React.useState(false);

 

  const [validUser, setValidUser] = React.useState(false);
  const [validPassword, setValidPassword] = React.useState(false);

  useEffect(() => {
    setValidUser(username.match(/^[a-zA-Z0-9_]{3,16}$/));
    setValidPassword(password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/));
  }, [username, password]);

  const handleSubmit = (e) => {
    e.preventDefault();



    const config = {
      headers: { Authorization: `Bearer ${Cookies.get('token')}` }
    };

    axios.post('http://localhost:8081/auth/login', {
      username: username,
      password: password
    },config)
    .then((response) => {
      Cookies.set('token', response.data.token);
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('email', response.data.user.email);
      localStorage.setItem('userID', response.data.user.userID);
      localStorage.setItem("files", JSON.stringify(response.data.user.files));
      setIsLoggedIn(true);
    }).catch((error) => {
      console.log(error);
    });
  };
 

  if (isLoggedIn) {
    // return <AllFiles userId={userId} username={username} files={files}/>;
    navigate("/");

  }
  return (
    
    <div className="wrapper">
      <div className="background-div">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>

          <TextField
            InputProps={{
              endAdornment: <FaUserAstronaut />,
            }}
            sx={{ width: "100%", marginBottom: "25px" }}
            label="Username"
            type="text"
            error={(!username && touchedUser) || (touchedUser && !validUser)}
            helperText={
              !username && touchedUser
                ? "Username is required"
                : "" || (!validUser && touchedUser)
                ? "Invalid Username"
                : ""
            }
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            onBlur={() => setTouchedUser(true)}
          />

          <TextField
            InputProps={{
              endAdornment: <TbPasswordFingerprint />,
            }}
            sx={{ width: "100%" }}
            label="Password"
            type="password"
            required
            error={
              (!password && touchedPassword) ||
              (touchedPassword && !validPassword)
            }
            helperText={
              !password && touchedPassword
                ? "Password is required"
                : "" || (!validPassword && touchedPassword)
                ? "Invalid Password"
                : ""
            }
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            onBlur={() => setTouchedPassword(true)}
          />

          <div className="remember-forgot">
            <label className="custom-checkbox">
              <input
                name="dummy"
                type="checkbox"
                onChange={(e) => setRemember(e.target.value)}
              />
              <span className="checkmark"></span>
              Remember me
            </label>
            {/* <ForgetPassword /> */}
          </div>
          <Button
           data-testid="login-btn"
            variant="contained"
            sx={{
              width: "100%",
              marginTop: "10px",
              padding: "10px",
              backgroundColor: "#FF5700",
              "&:hover": {
                backgroundColor: "#d32f2f",
              },
            }}
            startIcon={<FiLogIn />}
            disabled={!validUser || !validPassword}
            type="submit"
          >
            Login
          </Button>


          <div className="register-link">
            <p>
              Don't have an account? <a href="/signup">Register</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
