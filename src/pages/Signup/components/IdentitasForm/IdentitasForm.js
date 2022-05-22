import {
  Checkbox,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PropTypes from "prop-types";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import styled from "@emotion/styled";

const CustomCheckbox = styled(Checkbox)({
  margin: "0px",
  padding: "0px",
});

const IdentitasForm = ({
  value,
  onChange,
  agamaList,
  onChangeDate,
  errors,
  handleChangeCheckbox,
}) => {
  return (
    <Box>
      <Grid container spacing={"15px"}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              name="fullname"
              autoComplete="off"
              value={value.fullname}
              placeholder="Masukkan nama lengkap"
              label="Nama Lengkap"
              InputLabelProps={{ shrink: true }}
              onChange={onChange}
              error={!!errors.fullname}
              helperText={errors.fullname ? errors.fullname : null}
            />
          </FormControl>
        </Grid>
        <Grid item lg={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              name="phone"
              value={value.phone}
              placeholder="Masukkan nomor hp (08XXXX)"
              label="Nomor HP (Pastikan terhubung ke WhatsApp)"
              InputLabelProps={{ shrink: true }}
              onChange={onChange}
              error={!!errors.phone}
              helperText={errors.phone ? errors.phone : null}
            />
          </FormControl>
        </Grid>
        <Grid item lg={6} xs={12}>
          <FormControl fullWidth>
            <TextField
              name="email"
              value={value.email}
              placeholder="Masukkan alamat email"
              label="Email"
              InputLabelProps={{ shrink: true }}
              onChange={onChange}
              error={!!errors.email}
              helperText={errors.email ? errors.email : null}
            />
          </FormControl>
        </Grid>
        <Grid item lg={value.agama === "00" ? 3 : 8} xs={12}>
          <FormControl fullWidth error={!!errors.agama}>
            <InputLabel id="agama-label">Agama</InputLabel>
            <Select
              name="agama"
              value={value.agama}
              label="Agama"
              labelId="agama-label"
              notched
              onChange={onChange}
            >
              <MenuItem value="P0">
                <em>--pilih agama--</em>
              </MenuItem>
              {agamaList.map((row, index) => (
                <MenuItem value={row.value} key={index}>
                  {row.label}
                </MenuItem>
              ))}
            </Select>
            {errors.agama && <FormHelperText>{errors.agama}</FormHelperText>}
          </FormControl>
        </Grid>
        {value.agama === "00" && (
          <Grid item lg={5} xs={12}>
            <FormControl fullWidth>
              <TextField
                placeholder="Masukkan kepercayaan lain disini"
                name="agamalainnya"
                value={value.agamalainnya}
                onChange={onChange}
                autoComplete="off"
                error={!!errors.agamalainnya}
                helperText={errors.agamalainnya ? errors.agamalainnya : null}
              />
            </FormControl>
          </Grid>
        )}
        <Grid item lg={4} xs={12}>
          <FormControl fullWidth>
            <TextField
              name="birthplace"
              value={value.birthplace}
              placeholder="Masukkan tempat lahir "
              label="Tempat Lahir (Sesuai KTP)"
              InputLabelProps={{ shrink: true }}
              onChange={onChange}
              error={!!errors.birthplace}
              helperText={errors.birthplace ? errors.birthplace : null}
            />
          </FormControl>
        </Grid>
        <Grid item lg={8} xs={12}>
          <FormControl fullWidth>
            <TextField
              name="nik"
              value={value.nik}
              placeholder="Masukkan nomor NIK"
              label="NIK"
              InputLabelProps={{ shrink: true }}
              onChange={onChange}
              error={!!errors.nik}
              helperText={errors.nik ? errors.nik : null}
            />
          </FormControl>
        </Grid>
        <Grid item lg={4} xs={12}>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                value={value.birthday}
                onChange={(values) => onChangeDate(values, "birthday")}
                renderInput={(props) => (
                  <TextField
                    {...props}
                    placeholder="Pilih tanggal lahir"
                    label="Tanggal lahir (Sesuai KTP)"
                  />
                )}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid>

        <Grid item lg={4} xs={12}>
          <FormControl fullWidth error={!!errors.gender}>
            <InputLabel id="gender-label">Jenis Kelamin</InputLabel>
            <Select
              name="gender"
              value={value.gender}
              label="Jenis Kelamin"
              labelId="gender-label"
              notched
              onChange={onChange}
            >
              <MenuItem value="P0">
                <em>--pilih jenis kelamin--</em>
              </MenuItem>
              {["Laki-Laki", "Perempuan"].map((row, index) => (
                <MenuItem key={index} value={row}>
                  {row}
                </MenuItem>
              ))}
            </Select>
            {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item lg={8} xs={12}>
          <FormControl fullWidth error={!!errors.status}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              name="status"
              value={value.status}
              label="Status"
              labelId="status-label"
              notched
              onChange={onChange}
            >
              <MenuItem value="P0">
                <em>--pilih status--</em>
              </MenuItem>
              {["Belum Kawin", "Kawin"].map((row, index) => (
                <MenuItem key={index} value={row}>
                  {row}
                </MenuItem>
              ))}
            </Select>
            {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              name="alamatktp"
              multiline
              autoComplete="off"
              minRows={3}
              maxRows={3}
              placeholder="Masukan alamat yang terdapat pada KTP disini"
              label="Alamat (Sesuai KTP)"
              InputLabelProps={{ shrink: true }}
              onChange={onChange}
              value={value.alamatktp}
              error={!!errors.alamatktp}
              helperText={errors.alamatktp ? errors.alamatktp : null}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <TextField
              name="npwp"
              autoComplete="off"
              placeholder="Masukkan nomor NPWP"
              label="NPWP (opsional)"
              InputLabelProps={{ shrink: true }}
              onChange={onChange}
              value={value.npwp}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={"10px"}>
            <Stack direction={"row"} spacing={"5px"} alignItems="center">
              <CustomCheckbox
                disableRipple
                sx={{ margin: "0px" }}
                checked={value.domisiliasktp}
                onChange={handleChangeCheckbox}
                inputProps={{ "aria-label": "controlled" }}
                disabled={value.alamatktp ? false : true}
              />
              <InputLabel>Alamat domisili sama dengan KTP</InputLabel>
            </Stack>
            <FormControl fullWidth>
              <TextField
                name="alamatdomisili"
                multiline
                autoComplete="off"
                minRows={3}
                maxRows={3}
                placeholder="Masukan alamat domisili"
                InputLabelProps={{ shrink: true }}
                onChange={onChange}
                value={value.alamatdomisili}
                error={!!errors.alamatdomisili}
                helperText={
                  errors.alamatdomisili ? errors.alamatdomisili : null
                }
              />
            </FormControl>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

IdentitasForm.propTypes = {
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  agamaList: PropTypes.array.isRequired,
  onChangeDate: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  handleChangeCheckbox: PropTypes.func.isRequired,
};

export default IdentitasForm;
