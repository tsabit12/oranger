import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import api from "../../../../api";

const ButtonInterview = styled(Button)({
  fontSize: "16px",
  minHeight: "45px",
  padding: "5px 6px",
});

const ModalTidakLulus = ({ open, onClose, username, onSuccess }) => {
  const [loading, setloading] = useState(false);
  const [errors, seterrors] = useState({});

  useEffect(() => {
    if (!open) {
      seterrors({});
    }
  }, [open]);

  const onSubmit = async () => {
    setloading(true);
    seterrors({});

    try {
      const { status, message } = await api.user.tidaklulus({ username });
      if (status) {
        onSuccess();
      } else {
        seterrors({ global: message });
      }
    } catch (error) {
      console.log({ error });
    }

    setloading(false);
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle>KONFIRMASI TIDAK LULUS</DialogTitle>
      <DialogContent dividers>
        {errors.global && <Alert severity="error">{errors.global}</Alert>}
        <Box
          sx={{
            display: "flex",
            minHeight: "10vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography textAlign={"center"}>
            Apakah anda yakin mitra ini tidak lulus?
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <ButtonInterview onClick={onClose}>BATAL</ButtonInterview>
        <ButtonInterview disabled={loading} onClick={onSubmit}>
          {" "}
          {loading ? "Loading..." : "YA"}
        </ButtonInterview>
      </DialogActions>
    </Dialog>
  );
};

ModalTidakLulus.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default ModalTidakLulus;
