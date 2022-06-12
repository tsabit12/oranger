import {
  Typography,
  Link as MuiLink,
  Stack,
  FormControl,
  TextField,
  Paper,
  Divider,
  Button,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import queryString from "query-string";
import { Link } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styled from "@emotion/styled";
import api from "../../api";
import { convertDate } from "../../utils";

const CustomButton = styled(Button)({
  minHeight: "50px",
  margin: 0,
  width: "250px",
  fontSize: "14px",
});

const AddPks = (props) => {
  const [field, setfield] = useState({
    nomor: "",
    judul: "",
    start: new Date(),
    end: new Date(),
  });
  const [errors, seterrors] = useState({});
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false);

  const { kandidatData } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setfield((prev) => ({ ...prev, [name]: value }));
    seterrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onChangeDate = (value, name) => {
    setfield((prev) => ({ ...prev, [name]: value }));
    seterrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onSubmit = async () => {
    const errors = validate(field);
    seterrors(errors);
    if (Object.keys(errors).length === 0) {
      setloading(true);

      try {
        const payload = {
          username: kandidatData.username,
          judul: field.judul,
          nopks: field.nomor,
          mulai: convertDate(field.start, "yyyymmdd"),
          selesai: convertDate(field.end, "yyyymmdd"),
        };
        const add = await api.user.pks(payload);
        if (add.status) {
          setsuccess(true);
          setTimeout(() => {
            props.history.replace("/kandidat");
          }, 1000);
        } else {
          seterrors({ global: add.message });
        }
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
    if (!value.nomor) error.nomor = "Nomor pks belum diisi";
    if (!value.judul) error.judul = "Judul pks belum diisi";
    if (!value.start) error.start = "Tanggal mulai pks belum diisi";
    if (!value.end) error.end = "Tanggal selesai pks belum diisi";
    return error;
  };

  if (Object.keys(kandidatData).length > 0) {
    return (
      <Paper>
        <Box sx={{ padding: "15px 20px" }}>
          <Typography variant="title">
            ENTRI DATA PKS{" "}
            <span style={{ fontWeight: "700" }}>
              ({kandidatData.nama_mitra})
            </span>
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: "15px 20px", marginTop: "10px" }}>
          <Stack spacing={"15px"}>
            {errors.global && (
              <Alert severity="error" variant="filled">
                {errors.global}
              </Alert>
            )}

            {success && (
              <Alert severity="success" variant="filled">
                ENTRI PKS BERHASIL
              </Alert>
            )}
            <FormControl fullWidth>
              <TextField
                placeholder="Masukan nomor pks, contoh : 122/40000/NAMA MITRA"
                label="Nomor PKS"
                InputLabelProps={{ shrink: true }}
                value={field.nomor}
                name="nomor"
                autoComplete="off"
                onChange={handleChange}
                error={!!errors.nomor}
                helperText={errors.nomor ? errors.nomor : null}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                placeholder="Masukan judul PKS"
                label="Judul PKS"
                InputLabelProps={{ shrink: true }}
                value={field.judul}
                name="judul"
                autoComplete="off"
                onChange={handleChange}
                error={!!errors.judul}
                helperText={errors.judul ? errors.judul : null}
              />
            </FormControl>
            <Stack direction={"row"} spacing={"15px"}>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={field.start}
                    onChange={(values) => onChangeDate(values, "start")}
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        placeholder="Pilih tanggal mulai"
                        label="Tanggal mulai PKS"
                        error={!!errors.start}
                        helperText={errors.start ? errors.start : null}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
              <FormControl fullWidth>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={field.end}
                    onChange={(values) => onChangeDate(values, "end")}
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        placeholder="Pilih tanggal selesai"
                        label="Tanggal selesai PKS"
                        error={!!errors.end}
                        helperText={errors.end ? errors.end : null}
                        InputLabelProps={{ shrink: true }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </FormControl>
            </Stack>
          </Stack>
        </Box>
        <Divider />
        <Box
          sx={{
            padding: "5px 20px 15px 20px",
            marginTop: "10px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <CustomButton
            disabled={loading}
            variant="outlined"
            onClick={onSubmit}
          >
            {loading ? "Loading..." : "Submit"}
          </CustomButton>
        </Box>
      </Paper>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "84vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography textAlign={"center"} sx={{ color: "#737272" }}>
        Data tidak ditemukan, Mohon kembali ke halaman{" "}
        <MuiLink component={Link} to="/kandidat" underline="none">
          kandidat
        </MuiLink>{" "}
        lalu klik Entri PKS
      </Typography>
    </Box>
  );
};

AddPks.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  kandidatData: PropTypes.object.isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func.isRequired,
  }).isRequired,
};

function mapStateToProps(state, nextProps) {
  let kandidatData = {};
  if (nextProps.match.params.id) {
    const search = queryString.parse(nextProps.location.search);
    if (search.page) {
      const data = state.kandidat.data[Number(search.page)]
        ? state.kandidat.data[Number(search.page)]
        : [];
      const find = data.find(
        (row) => row.username === nextProps.match.params.id
      );
      if (find) {
        kandidatData = find;
      }
    }
  }

  return {
    kandidatData,
  };
}

export default connect(mapStateToProps, null)(AddPks);
