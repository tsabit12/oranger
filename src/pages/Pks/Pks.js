import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getpks } from "../../actions/pks";
import FilterListIcon from "@mui/icons-material/FilterList";

const LIMIT = 10;

const Pks = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setfilter] = useState({
    nik: "",
    fullname: "",
    status: "P00",
  });

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    (async () => {
      setisLoading(true);
      try {
        await props.getpks({ page: 0, limit: LIMIT }, 0);
      } catch (error) {
        console.log(error);
      }

      setisLoading(false);
    })();
  }, []);

  const columns = [
    {
      name: "no_pks",
      label: "#",
      options: {
        customBodyRender: (value, tableMeta) => {
          if (isLoading && props.pkslist.length === 0) {
            return <span>Loading...</span>;
          }

          let rowIndex =
            props.activePage * LIMIT + (Number(tableMeta.rowIndex) + 1);
          return <span>{rowIndex}</span>;
        },
      },
    },
    {
      name: "no_pks",
      label: "Nomor PKS",
    },
    {
      name: "judul_pks",
      label: "Judul PKS",
    },
    {
      name: "kantor",
      label: "KPRK",
      options: {
        sort: false,
        filter: false,
      },
    },
    {
      name: "nama_mitra",
      label: "Nama Mitra",
    },
    {
      name: "no_ktp",
      label: "NIK",
    },
    {
      name: "tgl_mulai",
      label: "Mulai",
    },
    {
      name: "tgl_selesai",
      label: "Selesai",
    },
    {
      name: "status",
      label: "Status",
      options: {
        sort: false,
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
          if (isLoading && props.pkslist.length === 0) {
            return null;
          }

          return (
            <Chip
              label={value === "p1" ? "Aktif" : "Tidak Aktif"}
              color={value === "p2" ? "error" : "primary"}
            />
          );
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

  const handleChangePage = async (page) => {
    const newoffset = page * LIMIT;
    setisLoading(true);
    try {
      await props.getpks(
        {
          page: newoffset,
          limit: LIMIT,
          nik: filter.nik ? filter.nik : undefined,
          status: filter.status,
        },
        page
      );
    } catch (error) {
      console.log(error);
    }

    setisLoading(false);
  };

  const onChangeFilter = (e) => {
    const { name, value } = e.target;
    setfilter((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetFilter = async () => {
    setfilter({
      nik: "",
      fullname: "",
      status: "P00",
    });
    setAnchorEl(null);
    setisLoading(true);

    try {
      await props.getpks({ page: 0, limit: LIMIT }, 0);
    } catch (error) {
      console.log({ error });
    }

    setisLoading(false);
  };

  const handleSearch = async () => {
    setisLoading(true);
    setAnchorEl(null);

    try {
      await props.getpks(
        {
          page: 0,
          limit: LIMIT,
          nik: filter.nik ? filter.nik : undefined,
          status: filter.status,
        },
        0
      );
    } catch (error) {
      console.log(error);
    }

    setisLoading(false);
  };

  return (
    <Box>
      <MUIDataTable
        title={
          <Typography>
            DAFTAR PKS MITRA{" "}
            {isLoading && (
              <CircularProgress
                size={24}
                sx={{ marginLeft: 4, position: "relative", top: 4 }}
              />
            )}
          </Typography>
        }
        data={
          isLoading && props.pkslist.length === 0
            ? [["Loading.."]]
            : props.pkslist
        }
        columns={columns}
        options={options}
      />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
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
                  <TextField
                    placeholder="Masukkan nomor KTP"
                    label="NIK"
                    value={filter.nik}
                    onChange={onChangeFilter}
                    name="nik"
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControl fullWidth>
                  <TextField
                    placeholder="Masukkan nama mitra"
                    label="Nama Mitra"
                    value={filter.fullname}
                    onChange={onChangeFilter}
                    name="fullname"
                    InputLabelProps={{ shrink: true }}
                    size="small"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={6}>
                <FormControl fullWidth>
                  <InputLabel id="statuslabel">Status</InputLabel>
                  <Select
                    name="status"
                    value={filter.status}
                    size="small"
                    labelId="statuslabel"
                    label="Status"
                    onChange={onChangeFilter}
                  >
                    <MenuItem value="P00">ALL STATUS</MenuItem>
                    <MenuItem value="P01">AKTIF</MenuItem>
                    <MenuItem value="P02">TIDAK AKTIF</MenuItem>
                  </Select>
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
    </Box>
  );
};

Pks.propTypes = {
  pkslist: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  getpks: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { page, data, total } = state.pks;
  let list = [];

  if (data[page]) list = data[page];

  return {
    pkslist: list,
    count: total,
    activePage: page,
  };
}

export default connect(mapStateToProps, { getpks })(Pks);
