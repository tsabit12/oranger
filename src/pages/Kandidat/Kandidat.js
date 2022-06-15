import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getkandidat } from "../../actions/kandidat";
import MUIDataTable from "mui-datatables";
import {
  Button,
  Typography,
  CircularProgress,
  IconButton,
  Tooltip,
  Stack,
  Divider,
  Grid,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Menu,
} from "@mui/material";
import styled from "@emotion/styled";
import FilterListIcon from "@mui/icons-material/FilterList";

const LIMIT = 10;

const ButtonInterview = styled(Button)({
  fontSize: "14px",
  textTransform: "none",
  minHeight: "15px",
  padding: "5px 6px",
});

const Kandidat = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setfilter] = useState({
    nik: "",
    fullname: "",
    status: "S0",
  });

  const open = Boolean(anchorEl);
  useEffect(() => {
    (async () => {
      setisLoading(true);
      try {
        await props.getkandidat({
          page: props.activePage,
          limit: LIMIT,
          status: filter.status,
        });
      } catch (error) {
        console.log(error);
      }

      setisLoading(false);
    })();
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onChangeFilter = (e) => {
    const { name, value } = e.target;
    setfilter((prev) => ({ ...prev, [name]: value }));
  };

  const columns = [
    {
      name: "kantor",
      label: "Kantor",
    },
    {
      name: "nama_mitra",
      label: "Fullname",
    },
    {
      name: "no_ktp",
      label: "NIK",
    },
    {
      name: "no_hp",
      label: "No Hp",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "jenis_kelamin",
      label: "Gender",
    },
    {
      name: "alamat_domisili",
      label: "Domisili",
    },
    {
      name: "status",
      label: "Status",
    },
    {
      label: "Actions",
      name: "username",
      options: {
        customBodyRender: (value) => {
          let data = props.kandidates.find((row) => row.username === value);
          if (isLoading && props.kandidates.length === 0) {
            return null;
          }

          return (
            <ButtonInterview
              size="small"
              variant="outlined"
              color={data.statusid === "S2" ? "warning" : "primary"}
              onClick={() => {
                if (data.statusid === "S2") {
                  props.history.push(
                    `kandidat/pks/${value}?page=${props.activePage}`
                  );
                } else {
                  props.history.push(
                    `kandidat/interview?page=${props.activePage}&id=${value}&status=${data.statusid}`
                  );
                }
              }}
              fullWidth
            >
              {data.statusid === "S2" ? "Entri Pks" : "Interview"}
            </ButtonInterview>
          );
        },
      },
    },
  ];

  const options = {
    sort: false,
    filter: false,
    serverSide: true,
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
      await props.getkandidat({
        page: newoffset,
        limit: LIMIT,
        status: filter.status,
        nik: filter.nik ? filter.nik : undefined,
        fullname: filter.fullname ? filter.fullname : undefined,
      });
    } catch (error) {
      console.log(error);
    }

    setisLoading(false);
  };

  const handleResetFilter = async () => {
    setfilter({
      nik: "",
      fullname: "",
      status: "S0",
    });
    setAnchorEl(null);
    setisLoading(true);

    try {
      await props.getkandidat({ page: 0, limit: LIMIT, status: "S0" });
    } catch (error) {
      console.log({ error });
    }

    setisLoading(false);
  };

  const handleSearch = async () => {
    setisLoading(true);
    setAnchorEl(null);

    try {
      await props.getkandidat({
        page: 0,
        limit: LIMIT,
        nik: filter.nik ? filter.nik : undefined,
        status: filter.status,
        fullname: filter.fullname ? filter.fullname : undefined,
      });
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
            DATA KANDIDAT{" "}
            {isLoading && (
              <CircularProgress
                size={24}
                sx={{ marginLeft: 4, position: "relative", top: 4 }}
              />
            )}
          </Typography>
        }
        data={
          isLoading && props.kandidates.length === 0
            ? [["Loading.."]]
            : props.kandidates
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
                    <MenuItem value="S0">All Status</MenuItem>
                    <MenuItem value="S1">In Review</MenuItem>
                    <MenuItem value="S2">Lulus</MenuItem>
                    <MenuItem value="S3">Tidak Lulus</MenuItem>
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

Kandidat.propTypes = {
  getkandidat: PropTypes.func.isRequired,
  kandidates: PropTypes.array.isRequired,
  activePage: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

function mapStateToProps(state) {
  const { page, data, total } = state.kandidat;
  let list = [];

  if (data[page]) list = data[page];

  return {
    kandidates: list,
    activePage: page,
    count: total,
  };
}

export default connect(mapStateToProps, { getkandidat })(Kandidat);
