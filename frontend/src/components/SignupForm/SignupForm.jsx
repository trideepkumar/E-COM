import React, { useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert, Button, CircularProgress, Slide } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../api/axiosInstance";
import { setUser } from "../../features/users/userSlice";
import { useDispatch } from "react-redux";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import InputAdornment from "@mui/material/InputAdornment";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

function SignupForm() {
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
    event.preventDefault();
    setLoading(true);
    if (!loading) {
      setError((prevState) => {
        return {
          ...prevState,
          others: "",
        };
      });
      axiosInstance
        .post("/api/register", { ...users })
        .then(({ data }) => {
          setLoading(false);
          if (data.success) {
            dispatch(setUser(data.user));
            console.log(data.user);
            navigate("/signup/otp");
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
<Container sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}> {/* Center content vertically */}
        <Box
        sx={{
          display: "column",
          justifyContent:'center',
          alignItems:'center',
          backgroundImage:
            'url("https://i.pinimg.com/1200x/44/4e/f0/444ef0ffe923fdc13acfe4f429774c2a.jpg")', // Add your background image path
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          xs: 2,
          sm: 2,
          lg: 2,
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "700", fontSize: "2rem", color: "#ffffff" }}
        >
          Welcome Back!
        </Typography>
        <Typography
          component="h1"
          variant="h4"
          sx={{ fontWeight: "500", fontSize: "1.8rem", color: "#ffffff" }}
        >
          To keep connected with us, please login with your personal info.
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 5,
            background: "rgba(236, 165, 20, 0)",
            borderRadius: "20px",
            color: "white",
            border: "1px solid white",
          }}
          size="large"
        >
          Login
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ fontWeight: "700", fontSize: "2rem", color: "#EDA514" }}
        >
          Create Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
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
                name="name"
                // label="Name"
                type="text"
                id="name"
                autoComplete="name"
                variant="filled"
                value={users.name}
                onChange={handleChange}
                error={!!error.name}
                helperText={error.name}
                style={{ borderBottom: "none" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person2OutlinedIcon />
                    </InputAdornment>
                  ),
                  placeholder: "Name",
                }}
              />
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
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
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
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              background: "#ECA514",
              borderRadius: "20px 20px 20px 20px",
              width: "15rem",
            }}
            size="large"
          >
            {loading ? (
              <CircularProgress sx={{ color: "white" }} size="1.7rem" />
            ) : (
              "sign up"
            )}
          </Button>
          <Grid container sx={{ justifyContent: "center", mt: 5 }}>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                sx={{ fontWeight: "500" }}
                component={RouterLink}
                to="/login"
              >
                {"Already have an account? Login"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignupForm;
