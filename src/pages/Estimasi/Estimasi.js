import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getestimasi } from "../../actions/estimasi";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import { calculatePeriode, decimalNumber, mappingRegional } from "../../utils";
import FilterListIcon from "@mui/icons-material/FilterList";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { getOffice } from "../../actions/references";

const LIMIT = 15;

const Estimasi = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setfilter] = useState({
    periode: new Date(),
    regions: [],
    wilayah: "P0",
    kprk: "P0",
  });

  useEffect(() => {
    (async () => {
      setisLoading(true);
      const periode = calculatePeriode(filter.periode, 1);

      try {
        await props.getOffice();
        await props.getestimasi(
          {
            page: 0,
            limit: LIMIT,
            tgl_awal: periode.start,
            tgl_akhir: periode.end,
            regional: filter.wilayah,
            kprk: filter.kprk,
          },
          0
        );
      } catch (error) {
        console.log(error);
      }

      setisLoading(false);
    })();
  }, []);

  useEffect(() => {
    if (Object.keys(props.offices).length > 0) {
      let regions = [];
      for (var property in props.offices) {
        regions.push(property);
      }

      setfilter((prev) => ({ ...prev, regions }));
    }
  }, [props.offices]);

  const columns = [
    {
      name: "id_wilayah",
      label: "#",
      options: {
        filter: false,
        customBodyRender: (value, tableMeta) => {
          let rowIndex =
            props.activePage * LIMIT + (Number(tableMeta.rowIndex) + 1);
          return <span>{rowIndex}</span>;
        },
      },
    },
    {
      name: "id_wilayah",
      label: "REGIONAL",
    },
    {
      name: "kprk",
      label: "KANTOR",
    },
    {
      name: "id_mitra",
      label: "ID MITRA",
    },
    {
      name: "nama_mitra",
      label: "NAMA",
    },
    {
      name: "jumlah_hari",
      label: "HARI",
      options: {
        setCellHeaderProps: () => ({
          style: {
            textAlign: "center",
          },
        }),
        setCellProps: () => ({
          style: {
            textAlign: "center",
          },
        }),
        customBodyRender: (value) => {
          return <span>{decimalNumber(value)}</span>;
        },
      },
    },
    {
      name: "berhasil_antar",
      label: "PRODUKSI",
      options: {
        setCellHeaderProps: () => ({
          style: {
            textAlign: "right",
          },
        }),
        setCellProps: () => ({
          style: {
            textAlign: "right",
          },
        }),
        customBodyRender: (value) => {
          return <span>{decimalNumber(value)}</span>;
        },
      },
    },
    {
      name: "bsu_insentif",
      label: "INSENTIF",
      options: {
        setCellHeaderProps: () => ({
          style: {
            textAlign: "right",
          },
        }),
        setCellProps: () => ({
          style: {
            textAlign: "right",
          },
        }),
        customBodyRender: (value) => {
          return <span>{decimalNumber(value)}</span>;
        },
      },
    },
    {
      name: "bsu_fee",
      label: "FEE",
      options: {
        setCellHeaderProps: () => ({
          style: {
            textAlign: "right",
          },
        }),
        setCellProps: () => ({
          style: {
            textAlign: "right",
          },
        }),
        customBodyRender: (value) => {
          return <span>{decimalNumber(value)}</span>;
        },
      },
    },
    {
      name: "bonus",
      label: "BONUS",
      options: {
        setCellHeaderProps: () => ({
          style: {
            textAlign: "right",
          },
        }),
        setCellProps: () => ({
          style: {
            textAlign: "right",
          },
        }),
        customBodyRender: (value) => {
          return <span>{decimalNumber(value)}</span>;
        },
      },
    },
    {
      name: "total_fee",
      label: "TOTAL FEE",
      options: {
        setCellHeaderProps: () => ({
          style: {
            textAlign: "right",
          },
        }),
        setCellProps: () => ({
          style: {
            textAlign: "right",
          },
        }),
        customBodyRender: (value) => {
          return <span>{decimalNumber(value)}</span>;
        },
      },
    },
  ];

  const options = {
    filter: false,
    serverSide: true,
    sort: false,
    count: props.count,
    page: props.activePage,
    onTableChange: (action, tableState) => {
      switch (action) {
        case "changePage":
          handleChangePage(tableState.page);
          break;
      }
    },
    elevation: 1,
    rowsPerPage: LIMIT,
    rowsPerPageOptions: [LIMIT],
    search: false,
    selectableRows: "none",
    customToolbar: () => {
      return (
        <IconButton
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <Tooltip title={"Filter"}>
            <FilterListIcon sx={{ "&:hover": { color: "#1976d2" } }} />
          </Tooltip>
        </IconButton>
      );
    },
  };

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePage = async (page) => {
    const newoffset = page * LIMIT;
    setisLoading(true);
    try {
      const periode = calculatePeriode(filter.periode, 1);
      await props.getestimasi(
        {
          page: newoffset,
          limit: LIMIT,
          tgl_awal: periode.start,
          tgl_akhir: periode.end,
          regional: mappingRegional(filter.wilayah),
        },
        page
      );
    } catch (error) {
      console.log(error);
    }

    setisLoading(false);
  };

  const onChangeDate = (val, name) =>
    setfilter((prev) => ({ ...prev, [name]: val }));

  const handleResetFilter = async () => {
    setfilter((prev) => ({
      ...prev,
      periode: new Date(),
      wilayah: "P0",
      kprk: "P0",
    }));

    setAnchorEl(null);
    setisLoading(true);

    try {
      const periode = calculatePeriode(new Date(), 1);
      await props.getestimasi(
        {
          page: 0,
          limit: LIMIT,
          tgl_awal: periode.start,
          tgl_akhir: periode.end,
          regional: "P0",
          kprk: "P0",
        },
        0
      );
    } catch (error) {
      console.log({ error });
    }

    setisLoading(false);
  };

  const handleSearch = async () => {
    setisLoading(true);
    setAnchorEl(null);

    try {
      const periode = calculatePeriode(filter.periode, 1);
      await props.getestimasi(
        {
          page: 0,
          limit: LIMIT,
          tgl_awal: periode.start,
          tgl_akhir: periode.end,
          regional: mappingRegional(filter.wilayah),
          kprk: filter.kprk,
        },
        0
      );
    } catch (error) {
      console.log({ error });
    }

    setisLoading(false);
  };

  const handleChangeFilter = (e) => {
    const { name, value } = e.target;

    if (name === "wilayah") {
      setfilter((prev) => ({ ...prev, [name]: value, kprk: "P0" }));
    } else {
      setfilter((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MUIDataTable
        title={
          <Typography>
            ESTIMASI PENDAPATAN FEE ORANGER{" "}
            {isLoading && (
              <CircularProgress
                size={24}
                sx={{ marginLeft: 4, position: "relative", top: 4 }}
              />
            )}
          </Typography>
        }
        data={
          isLoading && props.list.length === 0 ? [["Loading.."]] : props.list
        }
        columns={columns}
        options={options}
      />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            width: 500,
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            // mt: 1.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Stack sx={{ padding: "10px" }} spacing="15px">
          <Typography>Filter</Typography>
          <Divider />
          <Box>
            <Grid container spacing={"15px"}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <DatePicker
                    openTo="month"
                    views={["year", "month"]}
                    value={filter.periode}
                    onChange={(values) => onChangeDate(values, "periode")}
                    renderInput={(props) => (
                      <TextField
                        {...props}
                        placeholder="Pilih periode"
                        label="Periode"
                        size="small"
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={filter.wilayah === "P0" ? 12 : 5}>
                <FormControl fullWidth>
                  <Select
                    name="wilayah"
                    value={filter.wilayah}
                    onChange={handleChangeFilter}
                    size="small"
                  >
                    <MenuItem value="P0">Semua Wilayah</MenuItem>
                    {filter.regions.map((row, i) => (
                      <MenuItem key={i} value={row}>
                        {row}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              {filter.wilayah !== "P0" && (
                <Grid item xs={12} lg={7}>
                  <FormControl fullWidth>
                    <Select
                      name="kprk"
                      value={filter.kprk}
                      size="small"
                      onChange={handleChangeFilter}
                    >
                      <MenuItem value="P0">Semua Kantor</MenuItem>
                      {props.offices[filter.wilayah].map((row, i) => (
                        <MenuItem key={i} value={row.nopend}>
                          {row.nopend} - {row.kantor}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
            </Grid>
          </Box>
          <Divider />
          <Stack direction={"row"} justifyContent="flex-end">
            <Button
              sx={{ minHeight: "12px", fontSize: "14px" }}
              color="error"
              onClick={handleResetFilter}
            >
              Reset
            </Button>
            <Button
              sx={{ minHeight: "12px", fontSize: "14px" }}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Stack>
        </Stack>
      </Menu>
    </LocalizationProvider>
  );
};

Estimasi.propTypes = {
  getestimasi: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  list: PropTypes.array.isRequired,
  getOffice: PropTypes.func.isRequired,
  offices: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { page, data, total } = state.estimasi;
  let list = [];

  if (data[page]) list = data[page];
  return {
    list,
    count: total,
    activePage: page,
    offices: state.references.office,
  };
}

export default connect(mapStateToProps, { getestimasi, getOffice })(Estimasi);
