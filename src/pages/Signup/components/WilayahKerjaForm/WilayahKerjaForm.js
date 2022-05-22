import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@emotion/react";

const WilayahKerjaForm = ({
  offices,
  values,
  onChangeRegion,
  onChangeValue,
  onChangeInputValue,
  errors,
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"));

  const [regions, setregions] = useState([]);

  useEffect(() => {
    if (Object.keys(offices).length > 0) {
      let regions = [];
      for (var property in offices) {
        regions.push(property);
      }

      setregions(regions);
    }
  }, [offices]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        minHeight: "60vh",
        padding: "0px 15px",
      }}
    >
      <Box>
        <Stack spacing={"30px"}>
          <FormControl error={!!errors.regional}>
            <RadioGroup
              aria-labelledby="controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={values.regional}
              row={matches ? true : false}
              onChange={onChangeRegion}
            >
              {regions.map((row, i) => (
                <FormControlLabel
                  key={i}
                  value={row}
                  control={
                    <Radio
                      disableRipple
                      size="small"
                      sx={{
                        "&:hover": {
                          bgcolor: "transparent",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: "14px" }}>
                      {row.split("_")[1] ? row.split("_")[1] : "-"}
                    </Typography>
                  }
                  sx={{ fontSize: "12px" }}
                />
              ))}
            </RadioGroup>
            {errors.regional && (
              <FormHelperText sx={{ textAlign: "center" }}>
                {errors.regional}
              </FormHelperText>
            )}
          </FormControl>
          <Stack direction={"row"} justifyContent="center">
            <FormControl>
              <Autocomplete
                fullWidth
                value={values.autocompleteValue}
                onChange={(event, newValue) => {
                  onChangeValue(newValue);
                }}
                inputValue={values.autocompleteInputValue}
                onInputChange={(event, newInputValue) => {
                  onChangeInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                getOptionLabel={(option) => {
                  if (option.nopend) {
                    return `${option.nopend} - ${option.kantor}`;
                  } else {
                    return "";
                  }
                }}
                isOptionEqualToValue={(option, value) =>
                  option.nopend === value.nopend
                }
                options={values.options}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="KPRK (Pilih salah satu)"
                    error={!!errors.kprk}
                    helperText={errors.kprk ? errors.kprk : null}
                  />
                )}
                disabled={values.regional === "" ? true : false}
              />
            </FormControl>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

WilayahKerjaForm.propTypes = {
  offices: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired,
  onChangeRegion: PropTypes.func.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  onChangeInputValue: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

export default WilayahKerjaForm;
