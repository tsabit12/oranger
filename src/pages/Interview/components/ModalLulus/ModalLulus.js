import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import api from "../../../../api";
import { Box } from "@mui/system";
import { convertDate } from "../../../../utils";

const ButtonInterview = styled(Button)({
  fontSize: "16px",
  minHeight: "45px",
  padding: "5px 6px",
});

const ModalLulus = ({ open, onClose, data, onSucces }) => {
  const [field, setfield] = useState({
    nopks: "",
    start: new Date(),
    end: new Date(),
    judul: "",
  });
  const [errors, seterrors] = useState({});
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (!open) {
      setfield({
        nopks: "",
        start: new Date(),
        end: new Date(),
        judul: "",
      });
      seterrors({});
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setfield((prev) => ({ ...prev, [name]: value }));
    seterrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onChangeDate = (value, name) => {
    setfield((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    const errors = validate(field);
    seterrors(errors);
    if (Object.keys(errors).length === 0) {
      setloading(true);

      try {
        const { status, message } = await api.user.pks({
          username: data.username,
          judul: field.judul,
          nopks: field.nopks,
          mulai: convertDate(field.start, "yyyymmdd"),
          selesai: convertDate(field.end, "yyyymmdd"),
        });
        if (status) {
          onSucces();
        } else {
          seterrors({ global: message });
        }
      } catch (error) {
        seterrors({ global: "Internal server error" });
      }

      setloading(false);
    }
  };

  const validate = (values) => {
    const error = {};
    if (!values.nopks) error.nopks = "Nomor pks belum diisi";
    if (!values.judul) error.judul = "Judul pks belum diisi";
    return error;
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle>FORM PKS</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={"20px"}>
          {errors.global && <Alert severity="error">{errors.global}</Alert>}
          <Box>
            <Grid container spacing={"15px"}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    value={field.nopks}
                    placeholder="Masukan nomor pks, contoh : 122/40000/AGUS"
                    name="nopks"
                    autoComplete="off"
                    onChange={handleChange}
                    label="Nomor PKS"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.nopks}
                    helperText={errors.nopks ? errors.nopks : null}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    value={field.judul}
                    placeholder="Masukan judul pks, contoh : PKS ANTARAN AGUS"
                    name="judul"
                    autoComplete="off"
                    onChange={handleChange}
                    label="Judul PKS"
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6}>
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
                        />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6}>
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
                        />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <ButtonInterview onClick={onClose}>BATAL</ButtonInterview>
        <ButtonInterview disabled={loading} onClick={onSubmit}>
          {loading ? "Loading..." : "Submit"}
        </ButtonInterview>
      </DialogActions>
    </Dialog>
  );
};

ModalLulus.propTypes = {
  open: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSucces: PropTypes.func.isRequired,
};

export default ModalLulus;
