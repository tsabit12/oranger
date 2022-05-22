import { Box } from "@mui/system";
import React from "react";
import PropTypes from "prop-types";
import { FileUploader } from "react-drag-drop-files";
import { FormHelperText, Stack, Typography } from "@mui/material";
import styled from "@emotion/styled";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

const FileContent = styled(Box)(({ warna }) => ({
  border: `1px dashed ${warna}`,
  borderRadius: "10px",
  boxSizing: "border-box",
  minHeight: "7vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px 10px",
  width: "100%",
  cursor: "pointer",
}));

const BerkasForm = ({ list, onChange, onError, errors, values }) => {
  return (
    <Box sx={{ minHeight: "60vh", padding: "0px 15px" }}>
      <Typography textAlign={"center"} sx={{ marginBottom: "15px" }}>
        Pastikan format file yang diupload adalah{" "}
        <span style={{ color: "red" }}>jpg/pdf/png/jpeg</span>
      </Typography>
      <Stack spacing={"20px"}>
        {list.map((row, index) => (
          <Stack spacing={"10px"} key={index}>
            <Typography>{row.keterangan}</Typography>
            <FileUploader
              handleChange={(e) => onChange(e, row.berkasid)}
              name={row.berkasid}
              types={["JPG", "PDF", "PNG", "JPEG"]}
              onTypeError={() => onError(row.berkasid)}
            >
              <FileContent warna={errors[row.berkasid] ? "red" : "#24d152"}>
                {values[row.berkasid] === null ? (
                  <Stack spacing={"2px"}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <AddCircleRoundedIcon sx={{ color: "#24d152" }} />
                    </Box>
                    <Typography sx={{ fontSize: "14px" }} textAlign="center">
                      Drop file atau klik disini untuk upload berkas{" "}
                      <span style={{ color: "#24d152" }}>{row.keterangan}</span>
                    </Typography>
                  </Stack>
                ) : (
                  <Typography
                    sx={{ fontSize: "14px", color: "#24d152" }}
                    textAlign="center"
                  >
                    {values[row.berkasid].name}
                  </Typography>
                )}
              </FileContent>
            </FileUploader>
            {errors[row.berkasid] && (
              <FormHelperText sx={{ color: "red" }}>
                {errors[row.berkasid]}
              </FormHelperText>
            )}
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

BerkasForm.propTypes = {
  list: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  onError: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default BerkasForm;
