import styled from "@emotion/styled";
import {
  Button,
  FormControl,
  Grid,
  Link as MuiLink,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Link } from "react-router-dom";

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

const Login = () => {
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
          <form>
            <Stack spacing={"20px"}>
              <FormControl fullWidth>
                <TextField
                  placeholder="560XXXXXX"
                  label="Username"
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
              <FormControl fullWidth>
                <TextField
                  placeholder="Enter your password"
                  label="Password"
                  InputLabelProps={{ shrink: true }}
                />
              </FormControl>
              <Button
                variant="contained"
                startIcon={
                  <ArrowCircleRightIcon
                    sx={{ width: "30px", height: "30px" }}
                  />
                }
              >
                LOGIN
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

export default Login;
