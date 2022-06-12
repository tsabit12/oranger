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

const ButtonInterview = styled(Button)({
  fontSize: "16px",
  minHeight: "45px",
  padding: "5px 6px",
});

const ConfirmModal = ({ data, onClose, onSubmit }) => {
  const [errors, seterrors] = useState({});
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (!data.visible) {
      seterrors({});
    }
  }, [data.visible]);

  const handleSubmit = async () => {
    setloading(true);
    seterrors({});
    try {
      await onSubmit();
      onClose();
    } catch (error) {
      let msg = "Internal server error";
      if (error.message) {
        msg = error.message;
      }

      seterrors({ global: msg });
    }

    setloading(false);
  };

  // const onSubmit = async () => {
  //   setloading(true);
  //   seterrors({});

  //   try {
  //     const { status, message } = await api.user.tidaklulus({ username });
  //     if (status) {
  //       onSuccess();
  //     } else {
  //       seterrors({ global: message });
  //     }
  //   } catch (error) {
  //     console.log({ error });
  //   }

  //   setloading(false);
  // };

  return (
    <Dialog open={data.visible} fullWidth maxWidth="sm">
      <DialogTitle>KONFIRMASI AKSI</DialogTitle>
      <DialogContent dividers>
        {errors.global && (
          <Alert severity="error" variant="filled">
            {errors.global}
          </Alert>
        )}
        <Box
          sx={{
            display: "flex",
            minHeight: "10vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography textAlign={"center"}>
            {data.message === "S3"
              ? "Apakah anda yakin mitra ini tidak lulus?"
              : "Apakah anda yakin mitra ini lulus?"}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <ButtonInterview onClick={onClose}>BATAL</ButtonInterview>
        <ButtonInterview onClick={handleSubmit} disabled={loading}>
          {loading ? "Loading..." : "Ya"}
        </ButtonInterview>
      </DialogActions>
    </Dialog>
  );
};

ConfirmModal.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ConfirmModal;
