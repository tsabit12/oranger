import {
  Avatar,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { stringToColor } from "../../utils";

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const Home = (props) => {
  const { user } = props;
  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper sx={{ width: { lg: "50%", xs: "100%" } }}>
        <Box sx={{ padding: "20px" }}>
          <Typography variant="h6">Selamat datang!</Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: "20px" }}>
          <Stack spacing={"20px"}>
            <Stack direction={"row"} justifyContent="center">
              <Avatar
                {...stringAvatar(user.nama_mitra)}
                sx={{ width: "70px", height: "70px" }}
              />
            </Stack>
            <Typography fontWeight="700">Informasi Profil</Typography>
            <Stack spacing={"10px"}>
              <Typography>
                Nama Lengkap :{" "}
                <span style={{ fontWeight: "bold" }}>{user.nama_mitra}</span>
              </Typography>
              <Typography>
                Username :{" "}
                <span style={{ fontWeight: "bold" }}>{user.username}</span>
              </Typography>
              <Typography>
                Level :{" "}
                <span style={{ fontWeight: "bold" }}>{user.ket_jabatan}</span>
              </Typography>
              <Typography>
                Kantor :{" "}
                <span style={{ fontWeight: "bold" }}>
                  {user.kantor} - {user.nm_kantor}
                </span>
              </Typography>
              <Typography>
                Email : <span style={{ fontWeight: "bold" }}>{user.email}</span>
              </Typography>
              <Typography>
                No HP : <span style={{ fontWeight: "bold" }}>{user.no_hp}</span>
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Divider />
        <Box
          sx={{
            padding: "10px 20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            sx={{
              fontSize: "14px",
              "&:hover": { backgroundColor: "transparent" },
            }}
            variant="text"
            disableElevation
            disableRipple
          >
            Ubah Password
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

Home.propTypes = {
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.auth,
  };
}

export default connect(mapStateToProps, null)(Home);
