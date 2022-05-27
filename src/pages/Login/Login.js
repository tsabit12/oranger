import styled from "@emotion/styled";
import {
  Alert,
  AlertTitle,
  Button,
  FormControl,
  Grid,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";

const RootLayout = styled(Box)({
  backgroundColor: "#FFF",
  borderRadius: "10px",
  border: "1px solid rgba(163, 163, 162, 0.7)",
  margin: "20px 20px",
  padding: "15px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
});

const Login = (props) => {
  const { login: loggedIn } = props;
  const [field, setfield] = useState({
    username: "",
    password: "",
  });
  const [errors, seterrors] = useState({});
  const [loading, setloading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setfield((prev) => ({ ...prev, [name]: value }));
    seterrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = validate(field);
    seterrors(errors);
    if (Object.keys(errors).length === 0) {
      setloading(true);

      try {
        await loggedIn(field);
      } catch (error) {
        let msg = "Internal server error";
        if (error.message) {
          msg = error.message;
        }

        seterrors({ global: msg });
      }

      setloading(false);
    }
  };

  const validate = (value) => {
    const error = {};
    if (!value.username) error.username = "Username is required";
    if (!value.password) error.password = "Password is required";
    return error;
  };

  return (
    <Grid item lg={5} xs={12}>
      <RootLayout
        sx={{
          height: { xs: "100%", lg: "60vh" },
        }}
      >
        <Stack spacing={"50px"} sx={{ width: { lg: "80%", xs: "100%" } }}>
          <Typography fontSize={"20px"} fontWeight="bold" textAlign="center">
            Login to Your Account
          </Typography>
          {errors.global && (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {errors.global}
            </Alert>
          )}
          <form onSubmit={handleLogin}>
            <Stack spacing={"20px"}>
              <FormControl fullWidth>
                <TextField
                  placeholder="Enter your username"
                  label="Username"
                  InputLabelProps={{ shrink: true }}
                  value={field.username}
                  name="username"
                  onChange={handleChange}
                  error={!!errors.username}
                  helperText={errors.username ? errors.username : null}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  placeholder="Enter your password"
                  label="Password"
                  InputLabelProps={{ shrink: true }}
                  value={field.password}
                  name="password"
                  type={"password"}
                  autoComplete="on"
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password : null}
                />
              </FormControl>
              <Button
                variant="contained"
                type="submit"
                startIcon={
                  <ArrowCircleRightIcon
                    sx={{ width: "30px", height: "30px" }}
                  />
                }
                disabled={loading}
              >
                {loading ? "Loading..." : "LOGIN"}
              </Button>

              <Typography>
                Klik{" "}
                <MuiLink
                  underline="none"
                  component={Link}
                  to="/forgot-password"
                >
                  disini
                </MuiLink>{" "}
                jika lupa password. Atau kamu bisa{" "}
                <MuiLink underline="none" component={Link} to="/signup">
                  registrasi disini
                </MuiLink>
              </Typography>
            </Stack>
          </form>
        </Stack>
      </RootLayout>
    </Grid>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
