import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, CircularProgress, Slide } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axiosInstance";
import { setUser } from "../../features/users/userSlice";
import { useDispatch } from "react-redux";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import InputAdornment from "@mui/material/InputAdornment";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Button from "../ui/Button";
import "../styles/Signup.css";
import Users from "../../../../server/Model/User";

function LoginForm() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [users, setUsers] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    others: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    console.log("handle submitted");
    event.preventDefault();
    setLoading(true);
    if (!loading) {
      setError((prevState) => {
        return {
          ...prevState,
          others: "",
        };
      });
      console.log(users)
      axiosInstance
        .post("/api/login", { ...users })
        .then(({ data }) => {
          setLoading(false);
          if (data.success) {
            dispatch(setUser(data.user));
            console.log(data.user);
            navigate("/signup");
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          if (error?.response?.status === 400) {
            const { data } = error?.response;
            setError((prevState) => {
              return {
                ...prevState,
                ...data,
              };
            });
          }
          if (error?.response?.status === 409) {
            setError((prevState) => {
              return {
                ...prevState,
                others: error.response.data.message,
              };
            });
          }
        });
    }
  };

  const handleChange = (event) => {
    setError((prevState) => {
      const { name } = event.target;
      return {
        ...prevState,
        [name]: "",
      };
    });
    setUsers((prevState) => {
      const { name } = event.target;
      return {
        ...prevState,
        [name]: event.target.value,
      };
    });
  };

  return (
    <Box className="container">
      <Box className="form">
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Typography
            component="h1"
            variant="h5"
            sx={{
              fontWeight: "700",
              fontSize: "2rem",
              color: "#EDA514",
              display: "flex",
              justifyContent: "center",
            }}
          >
            Create Account
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {error.others && (
                <Slide direction="up" in={!!error.others}>
                  <Alert
                    variant="filled"
                    severity="error"
                    sx={{ mt: 1 }}
                    fullWidth
                  >
                    {error.others}
                  </Alert>
                </Slide>
              )}
            </Grid>

            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                type="email"
                id="email"
                autoComplete="email"
                color="primary"
                variant="filled"
                value={users.email}
                onChange={handleChange}
                error={!!error.email}
                helperText={error.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                  placeholder: "E-mail",
                }}
                sx={{ backgroundColor: "#F4F8F5" }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                color="primary"
                variant="filled"
                value={users.password}
                onChange={handleChange}
                error={!!error.password}
                helperText={error.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpenOutlinedIcon />
                    </InputAdornment>
                  ),
                  placeholder: "Password",
                }}
                sx={{ backgroundColor: "#F4F8F5" }}
              />
            </Grid>
          </Grid>
          <Button
            onClick={handleSubmit}
            style={{
              marginTop: "13px",
              marginLeft: "10rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "14rem",
              borderRadius: "43.678px",
            }}
          >
            {loading ? (
              <CircularProgress sx={{ color: "white" }} size="1.7rem" />
            ) : (
              "LOG IN"
            )}
          </Button>
        </Box>
      </Box>

      <Box className="custom-box">
        <Typography
          style={{
            color: "#FFFFFF",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            fontFamily: "Montserrat",
            fontSize: "56.781px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "normal",
          }}
        >
          Welcome Back!
        </Typography>
        <Typography
          style={{
            color: "#FFFFFF",
            display: "flex",
            flexDirection: "initial",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            fontFamily: "Montserrat",
            fontSize: "16.207px",
            fontStyle: "normal",
            fontWeight: "400",
            lineHeight: "140.4%",
          }}
        >
          Enter your personal details and start your journey with us{" "}
        </Typography>
        <RouterLink to='/'>
        <Button
         style={{
            backgroundColor: "rgba(0, 0, 0, 0)",
            border: "solid",
            width: "13rem",
            borderRadius: "43.678px",
            marginTop:"3rem"
          }}
        >
          SIGN UP
        </Button>
        </RouterLink>
      </Box>
    </Box>
  );
}

export default LoginForm;
