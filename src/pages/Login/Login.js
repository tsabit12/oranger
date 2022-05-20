import { Link as MuiLink, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <Box>
      <Typography>This is login page</Typography>
      <MuiLink component={Link} to="/home">
        go to home
      </MuiLink>
    </Box>
  );
};

export default Login;
