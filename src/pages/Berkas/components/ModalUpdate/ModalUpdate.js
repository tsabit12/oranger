import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ModalUpdate = (props) => {
  const { data } = props;

  const [field, setfield] = useState({
    berkasid: "",
    keterangan: "",
    with_file: 0,
  });
  const [loading, setloading] = useState(false);
  const [errors, seterrors] = useState({});

  useEffect(() => {
    if (data.visible) {
      seterrors({});
      setfield(data.data);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setfield((prev) => ({ ...prev, [name]: value }));
    seterrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const onSubmit = async () => {
    const errors = validate(field);
    seterrors(errors);
    if (Object.keys(errors).length === 0) {
      setloading(true);

      try {
        await props.onUpdate(field);
        props.onClose();
      } catch (error) {
        let msg = "Internal server error";
        if (error.message) msg = error.message;
        seterrors({ global: msg });
      }

      setloading(false);
    }
  };

  const validate = (value) => {
    const error = {};
    if (!value.keterangan) error.keterangan = "Deskripsi belum diisi";
    return error;
  };

  return (
    <Dialog open={data.visible} onClose={props.onClose} fullWidth maxWidth="sm">
      <DialogTitle>UPDATE BERKAS</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={"15px"}>
          {errors.global && (
            <Alert severity="error" variant="filled">
              <AlertTitle>Failed</AlertTitle>
              {errors.global}
            </Alert>
          )}
          <FormControl fullWidth>
            <TextField
              value={field.keterangan}
              placeholder="Masukkan keterangan"
              label="Deksripsi"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              autoComplete="off"
              name="keterangan"
              error={!!errors.keterangan}
              helperText={errors.keterangan ? errors.keterangan : null}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="withfileLabel">Dengan File</InputLabel>
            <Select
              name="with_file"
              value={field.with_file}
              label="Dengan File"
              labelId="withfileLabel"
              onChange={handleChange}
            >
              <MenuItem value={0}>Tidak</MenuItem>
              <MenuItem value={1}>Ya</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ minHeight: "10px", fontSize: "14px" }}
          onClick={props.onClose}
        >
          Close
        </Button>
        <Button
          sx={{ minHeight: "10px", fontSize: "14px" }}
          onClick={onSubmit}
          disabled={loading}
        >
          {loading ? "Loading.." : "SIMPAN"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalUpdate.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ModalUpdate;
