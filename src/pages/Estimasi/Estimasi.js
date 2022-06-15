import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Menu,
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
import { calculatePeriode, decimalNumber } from "../../utils";
import FilterListIcon from "@mui/icons-material/FilterList";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const LIMIT = 15;

const Estimasi = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setfilter] = useState({
    periode: new Date(),
  });

  useEffect(() => {
    (async () => {
      setisLoading(true);
      const periode = calculatePeriode(filter.periode, 1);

      try {
        await props.getestimasi(
          {
            page: 0,
            limit: LIMIT,
            tgl_awal: periode.start,
            tgl_akhir: periode.end,
          },
          0
        );
      } catch (error) {
        console.log(error);
      }

      setisLoading(false);
    })();
  }, []);

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
    setfilter({
      periode: new Date(),
    });

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
        },
        0
      );
    } catch (error) {
      console.log({ error });
    }

    setisLoading(false);
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
            width: 400,
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
};

function mapStateToProps(state) {
  const { page, data, total } = state.estimasi;
  let list = [];

  if (data[page]) list = data[page];
  return {
    list,
    count: total,
    activePage: page,
  };
}

export default connect(mapStateToProps, { getestimasi })(Estimasi);
