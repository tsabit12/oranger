import {
  Alert,
  AlertTitle,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ModalAdd = (props) => {
  const [field, setfield] = useState({
    keterangan: "",
    with_file: "00",
  });
  const [errors, seterrors] = useState({});
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (props.visible) {
      setfield({ keterangan: "", with_file: "00" });
    }
  }, [props.visible]);

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
        await props.onAdd(field);
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
    if (value.with_file === "00") error.with_file = "Harap pilih salah satu";
    return error;
  };

  return (
    <Dialog open={props.visible} fullWidth maxWidth="sm">
      <DialogTitle>TAMBAH BERKAS</DialogTitle>
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
              placeholder="Masukkan deskripsi"
              label="Deskripsi"
              value={field.keterangan}
              name="keterangan"
              autoComplete="off"
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={!!errors.keterangan}
              helperText={errors.keterangan ? errors.keterangan : null}
            />
          </FormControl>
          <FormControl fullWidth error={!!errors.with_file}>
            <InputLabel id="withfilelable">Dengan File</InputLabel>
            <Select
              value={field.with_file}
              name="with_file"
              labelId="withfilelable"
              label="Dengan File"
              onChange={handleChange}
            >
              <MenuItem value="00">
                <em>--select option--</em>
              </MenuItem>
              <MenuItem value={0}>Tidak</MenuItem>
              <MenuItem value={1}>Ya</MenuItem>
            </Select>
            {errors.with_file && (
              <FormHelperText>{errors.with_file}</FormHelperText>
            )}
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
          {loading ? "Loading.." : "Tambah"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ModalAdd.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default ModalAdd;
