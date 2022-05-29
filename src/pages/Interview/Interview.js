/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { connect } from "react-redux";
import { Box } from "@mui/system";
import {
  Alert,
  Button,
  Grid,
  Link as MuiLink,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import api from "../../api";
import styled from "@emotion/styled";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { ModalLulus, ModalTidakLulus } from "./components";

const ImageCard = styled(Paper)({
  overflow: "hidden",
});

const Interview = (props) => {
  const { kandidatData } = props;

  const [loading, setloading] = useState(true);
  const [berkas, setberkas] = useState([]);
  const [nilai, setnilai] = useState({});
  const [lulusVisible, setlulusVisible] = useState(false);
  const [success, setsuccess] = useState(false);
  const [tidakLulus, settidakLulus] = useState(false);

  useEffect(() => {
    if (Object.keys(kandidatData).length > 0) {
      (async () => {
        setloading(true);

        try {
          const { status, message, result } = await api.user.berkas({
            username: kandidatData.username,
          });
          if (status) {
            setberkas(result);
          } else {
            alert(message);
          }
        } catch (error) {
          console.log({ error });
        }

        setloading(false);
      })();
    }
  }, [kandidatData]);

  useEffect(() => {
    if (berkas.length > 0) {
      const key = {};

      berkas.forEach((row) => {
        key[row.berkasid] = Number(row.nilai) / 20;
      });

      setnilai(key);
    }
  }, [berkas]);

  const updateRating = async (key, nilai) => {
    setnilai((prev) => ({ ...prev, [key]: nilai }));

    try {
      const { status, message } = await api.user.updateberkas({
        username: kandidatData.username,
        berkasid: key,
        nilai: Number(nilai) * 20,
      });

      if (!status) {
        alert(message);
        setnilai((prev) => ({ ...prev, [key]: 0 }));
      }
    } catch (error) {
      alert("UPDATE ERROR");
      setnilai((prev) => ({ ...prev, [key]: 0 }));
    }
  };

  const handleSuccess = (type) => {
    if (type === "lulus") {
      setlulusVisible(false);
    } else {
      settidakLulus(false);
    }

    setsuccess(true);

    setTimeout(() => {
      props.history.replace("/kandidat");
    }, 1000);
  };

  if (Object.keys(kandidatData).length > 0) {
    return (
      <React.Fragment>
        <ModalLulus
          open={lulusVisible}
          data={kandidatData}
          onClose={() => setlulusVisible(false)}
          onSucces={() => handleSuccess("lulus")}
        />
        <ModalTidakLulus
          open={tidakLulus}
          onClose={() => settidakLulus(false)}
          username={kandidatData.username}
          onSuccess={() => handleSuccess("tidaklulus")}
        />
        {loading ? (
          <Typography>Memuat berkas...</Typography>
        ) : (
          <Stack spacing={"20px"}>
            <Typography>
              Mitra atas nama{" "}
              <span style={{ fontWeight: "bold" }}>
                {kandidatData.nama_mitra}
              </span>
            </Typography>
            <Grid container spacing={2}>
              {berkas.map((row, index) => (
                <Grid item xs={4} key={index}>
                  <ImageCard>
                    <img
                      src={`${process.env.REACT_APP_ENDPOINT}/assets/berkas/${row.file_name}`}
                      style={{ width: "100%", height: "30vh" }}
                    />
                    <Box sx={{ padding: "15px 10px" }}>
                      <Typography
                        textAlign={"center"}
                        sx={{ fontSize: "18px", fontWeight: "bold" }}
                      >
                        {row.keterangan}
                      </Typography>
                      {Object.keys(nilai).length > 0 && (
                        <Stack direction={"row"} justifyContent="center">
                          <Rating
                            name="simple-controlled"
                            value={nilai[row.berkasid]}
                            onChange={(event, newValue) =>
                              updateRating(row.berkasid, newValue)
                            }
                          />
                        </Stack>
                      )}
                    </Box>
                  </ImageCard>
                </Grid>
              ))}
            </Grid>
            <Stack direction={"row"} spacing={"20px"}>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                endIcon={<CloseIcon />}
                onClick={() => settidakLulus(true)}
              >
                MITRA INI TIDAK LULUS
              </Button>
              <Button
                fullWidth
                variant="outlined"
                endIcon={<CheckIcon />}
                onClick={() => setlulusVisible(true)}
              >
                MITRA INI LULUS
              </Button>
            </Stack>
            {success && (
              <Alert severity="success">DATA BERHASIL DI UPDATE</Alert>
            )}
          </Stack>
        )}
      </React.Fragment>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "80vh",
        alignItems: "center",
      }}
    >
      <Typography textAlign={"center"} sx={{ color: "#737272" }}>
        Data tidak ditemukan, Mohon kembali ke halaman{" "}
        <MuiLink component={Link} to="/kandidat" underline="none">
          kandidat
        </MuiLink>{" "}
        lalu klik interview
      </Typography>
    </Box>
  );
};

Interview.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  kandidatData: PropTypes.object.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state, props) {
  let kandidatData = {};
  if (props.location.search) {
    const search = queryString.parse(props.location.search);
    if (search.page && search.id) {
      const data = state.kandidat.data[Number(search.page)]
        ? state.kandidat.data[Number(search.page)]
        : [];
      const find = data.find((row) => row.username === search.id);
      if (find) {
        kandidatData = find;
      }
    }
  }

  return {
    kandidatData,
  };
}

export default connect(mapStateToProps, null)(Interview);
