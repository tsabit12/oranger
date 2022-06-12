import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getkandidat } from "../../actions/kandidat";
import MUIDataTable from "mui-datatables";
import { Button, Typography, CircularProgress } from "@mui/material";
import styled from "@emotion/styled";

const LIMIT = 10;

const ButtonInterview = styled(Button)({
  fontSize: "14px",
  textTransform: "none",
  minHeight: "15px",
  padding: "5px 6px",
});

const Kandidat = (props) => {
  const [isLoading, setisLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setisLoading(true);
      try {
        await props.getkandidat({ page: props.activePage, limit: LIMIT });
      } catch (error) {
        console.log(error);
      }

      setisLoading(false);
    })();
  }, []);

  const columns = [
    {
      name: "nama_mitra",
      label: "Fullname",
      options: {
        filterOptions: { fullWidth: true },
      },
    },
    {
      name: "no_ktp",
      label: "NIK",
      options: {
        sort: false,
      },
    },
    {
      name: "no_hp",
      label: "No Hp",
      options: {
        sort: false,
        filter: false,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        sort: false,
        filter: false,
      },
    },
    {
      name: "jenis_kelamin",
      label: "Gender",
    },
    {
      name: "alamat_domisili",
      label: "Domisili",
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      label: "Actions",
      name: "username",
      options: {
        sort: false,
        filter: false,
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
    filters: false,
    filterType: "dropdown",
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
    selectableRows: false,
  };

  const handleChangePage = async (page) => {
    const newoffset = page * LIMIT;
    setisLoading(true);
    try {
      await props.getkandidat({ page: newoffset, limit: LIMIT });
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
            Data Kandidat{" "}
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
