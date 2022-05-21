import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PropTypes from "prop-types";

const Signup = ({ children }) => {
  return (
    <Box>
      <Typography>Signup layout</Typography>
      {children}
    </Box>
  );
};

Signup.propTypes = {
  children: PropTypes.number.isRequired,
};

export default Signup;
