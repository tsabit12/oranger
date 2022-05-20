/* eslint-disable no-undef */
import { Button, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ButtonLink = styled(Button)({
  borderRadius: "0px",
  "&:hover": {
    backgroundColor: "#FFF",
  },
  textTransform: "none",
  fontSize: "20px",
});

const RootLayout = styled(Box)({
  position: "relative",
  minHeight: "100vh",
  backgroundColor: "#FFF",
});

const Login = ({ children }) => {
  return (
    <RootLayout>
      <Box sx={{ padding: "10px 10px" }}>
        <Stack
          direction={"row"}
          justifyContent="flex-end"
          spacing={"20px"}
          sx={{ marginRight: { lg: "50px", sx: "5px" } }}
        >
          <ButtonLink
            component={Link}
            to="/signup"
            endIcon={
              <ArrowForwardIcon sx={{ width: "30px", height: "30px" }} />
            }
          >
            Registrasi
          </ButtonLink>
        </Stack>
        <Grid
          container
          justifyContent={"flex-end"}
          alignItems="center"
          sx={{ minHeight: "80vh" }}
        >
          <Grid
            item
            lg={4}
            sm={12}
            xs={12}
            sx={{
              marginRight: { lg: "300px", xs: "0px", sm: "0px" },
              position: "relative",
              zIndex: 1,
            }}
          >
            <Stack spacing={"20px"}>
              <Typography variant="h4">WELCOME ORANGER</Typography>
              {children}
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <img
        alt="wave"
        src={`${process.env.REACT_APP_PUBLIC_URL}/assets/wave.svg`}
        style={{
          width: "100%",
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 0,
        }}
      />
    </RootLayout>
  );
};

Login.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Login;
