import styled from "@emotion/styled";
import {
  Button,
  FormControl,
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
});

const Login = () => {
  return (
    <RootLayout sx={{ padding: { lg: "30px 15px", xs: "30px 12px" } }}>
      <Stack spacing={"30px"}>
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
                <ArrowCircleRightIcon sx={{ width: "30px", height: "30px" }} />
              }
            >
              LOGIN
            </Button>
          </Stack>
        </form>
        <Typography textAlign={"center"}>
          Did you{" "}
          <MuiLink underline="none" component={Link} to="/forgot-password">
            forgot your password?
          </MuiLink>
        </Typography>
      </Stack>
    </RootLayout>
  );
};

export default Login;
