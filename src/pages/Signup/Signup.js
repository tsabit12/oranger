import styled from "@emotion/styled";
import {
  Button,
  Divider,
  Grid,
  Link as MuiLink,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getBerkas } from "../../actions/references";
import PropTypes from "prop-types";
import { IdentitasForm } from "./components";
import { Link } from "react-router-dom";

const RootLayout = styled(Box)({
  backgroundColor: "#FFF",
  borderRadius: "10px",
  border: "1px solid rgba(163, 163, 162, 0.7)",
  margin: "20px 20px",
  padding: "15px",
  position: "relative",
  // minHeight: "70vh",
});

const CustomTab = styled((props) => <Tab disableRipple {...props} />)(() => ({
  textTransform: "none",
  color: "#323333",
  fontSize: "16px",
}));

const ButtonText = styled((props) => (
  <Button disableRipple disableElevation {...props} />
))(() => ({
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: "transparent",
  },
  fontSize: "16px",
  textTransform: "none",
  padding: "5px 10px",
  minHeight: "10px",
}));

const Signup = (props) => {
  const { agama: agamaList } = props.references;
  const [tabValue, settabValue] = useState(0);
  const [identitas, setidentitas] = useState({
    fullname: "",
    phone: "",
    email: "",
    agamalainnya: "",
    agama: "P0",
    birthplace: "",
    birthday: new Date(),
    gender: "P0",
    status: "P0",
    nik: "",
    alamatktp: "",
    npwp: "",
    alamatdomisili: "",
    domisiliasktp: false,
  });
  const [errors, seterrors] = useState({});

  useEffect(() => {
    (async () => {
      try {
        await props.getBerkas();
      } catch (error) {
        console.log({ error });
      }
    })();
  }, []);

  // const handleChangeTab = (e, newValue) => settabValue(newValue);

  const handleChange = (e) => {
    const { name, value } = e.target;
    //reset freetext agama
    if (name === "agama" && value !== "00") {
      setidentitas((prev) => ({ ...prev, agamalainnya: "" }));
    }

    if (name === "alamatdomisili" && identitas.domisiliasktp) {
      setidentitas((prev) => ({ ...prev, domisiliasktp: false }));
    }

    setidentitas((prev) => ({ ...prev, [name]: value }));
    seterrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleChangeDate = (value, name) => {
    setidentitas((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePage = (activePage, type) => {
    if (type === "next") {
      if (activePage === 0) {
        const errors = validateIdentitas(identitas);
        seterrors(errors);
        if (Object.keys(errors).length === 0) {
          settabValue(activePage + 1);
        }
      } else {
        settabValue(activePage + 1);
      }
    } else {
      settabValue(activePage - 1);
    }
  };

  const validateIdentitas = (field) => {
    const regexEmail =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const error = {};
    if (!field.fullname) error.fullname = "Nama lengkap belum diisi";
    if (!field.phone) error.phone = "Nomor hp belum diisi";
    if (!field.email) error.email = "Email belum diisi";
    if (field.email && !regexEmail.test(field.email))
      error.email = "Email tidak valid";
    if (field.agama === "P0") error.agama = "Agama belum dipilih";
    if (field.agama === "00" && !field.agamalainnya)
      error.agamalainnya = "Kepercayaan lainnya belum diisi";
    if (!field.nik) error.nik = "NIK belum diisi";
    if (!field.birthplace) error.birthplace = "Tempat lahir belum diisi";
    if (!field.alamatktp) error.alamatktp = "Alamat belum diisi";
    if (field.gender === "P0") error.gender = "Jenis kelamin belum dipilih";
    if (field.status === "P0") error.status = "Status belum dipilih";
    if (!field.alamatdomisili)
      error.alamatdomisili = "Alamat domisili belum diisi";
    return error;
  };

  const handleChangeCheckbox = (e) => {
    const val = e.target.checked;

    setidentitas((prev) => ({
      ...prev,
      domisiliasktp: val,
      alamatdomisili: val ? identitas.alamatktp : "",
    }));

    seterrors((prev) => ({ ...prev, alamatdomisili: undefined }));
  };

  return (
    <Grid item lg={8} xs={12} sm={12}>
      <RootLayout>
        <Stack spacing={"20px"}>
          <Typography color={"#323333"} textAlign={"center"}>
            Untuk registrasi menjadi{" "}
            <span style={{ fontWeight: "bold", color: "#0a0a0a" }}>
              Oranger antaran
            </span>{" "}
            silahkan
            <br /> lengkapi form dibawah ini dengan benar
          </Typography>
          <Divider />

          <Tabs value={tabValue} variant="fullWidth">
            <CustomTab label="Data Personal" />
            <CustomTab label="Wilayah Kerja" />
            <CustomTab label="Salinan Berkas" />
            <CustomTab label="Notifikasi" />
          </Tabs>
          <Box />
          {tabValue === 0 && (
            <IdentitasForm
              value={identitas}
              onChange={handleChange}
              agamaList={agamaList}
              onChangeDate={handleChangeDate}
              errors={errors}
              handleChangeCheckbox={handleChangeCheckbox}
            />
          )}

          <Stack
            direction={"row"}
            justifyContent="space-between"
            alignItems={"center"}
          >
            <Typography>
              Kembali{" "}
              <MuiLink component={Link} to="/login" underline="none">
                login
              </MuiLink>
            </Typography>
            <Stack direction={"row"} spacing={"10px"}>
              <ButtonText
                size="small"
                color="teritary"
                variant="outlined"
                disabled={tabValue > 0 ? false : true}
                onClick={() => handleChangePage(tabValue, "back")}
              >
                Kembali
              </ButtonText>
              <ButtonText
                size="small"
                variant="outlined"
                onClick={() => handleChangePage(tabValue, "next")}
              >
                Selanjutnya
              </ButtonText>
            </Stack>
          </Stack>
        </Stack>
      </RootLayout>
    </Grid>
  );
};

Signup.propTypes = {
  getBerkas: PropTypes.func.isRequired,
  references: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    references: state.references,
  };
}

export default connect(mapStateToProps, { getBerkas })(Signup);
