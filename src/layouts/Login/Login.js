/* eslint-disable no-undef */
import { Grid } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const Login = ({ children }) => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent={"center"}
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${process.env.REACT_APP_PUBLIC_URL}/assets/wave1.svg)`,
        backgroundPosition: "right",
        backgroundSize: "cover",
        backgroundRepeat: "none",
      }}
    >
      <Grid item lg={5} xs={12}>
        {children}
      </Grid>
    </Grid>
  );
};

Login.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Login;
