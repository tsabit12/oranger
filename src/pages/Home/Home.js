import { Link as MuiLink, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Box>
      <Typography>This is home page</Typography>
      <MuiLink component={Link} to="/login">
        go to login
      </MuiLink>
    </Box>
  );
};

export default Home;
