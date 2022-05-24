import styled from "@emotion/styled";
import { Box, Link, Typography } from "@mui/material";
import React from "react";
import { Link as NavLink } from "react-router-dom";

const RootLayout = styled(Box)({
  minHeight: "60vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const SuccessMessage = () => {
  return (
    <RootLayout>
      <center>
        <img
          alt="successimage"
          // eslint-disable-next-line no-undef
          src={`${process.env.REACT_APP_PUBLIC_URL}/assets/success.png`}
          style={{ width: "250px" }}
        />
        <Typography textAlign={"center"} sx={{ marginTop: "20px" }}>
          Data kamu berhasil disubmit. Kami akan mengirimkan anda email
          secepatnya jika data kamu sudah kami verifikasi. <br />
          Terimakasih. Klik{" "}
          <Link component={NavLink} to="/login" underline="none">
            disini
          </Link>{" "}
          untuk kembali ke halaman login
        </Typography>
      </center>
    </RootLayout>
  );
};

export default SuccessMessage;
