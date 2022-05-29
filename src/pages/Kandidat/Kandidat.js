import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getkandidat } from "../../actions/kandidat";
import MUIDataTable from "mui-datatables";
import { Button } from "@mui/material";
import styled from "@emotion/styled";

const ButtonInterview = styled(Button)({
  fontSize: "14px",
  textTransform: "none",
  minHeight: "15px",
  padding: "5px 6px",
});

const Kandidat = (props) => {
  useEffect(() => {
    (async () => {
      try {
        await props.getkandidat({ page: props.activePage });
      } catch (error) {
        console.log(error);
      }
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
      name: "status_kawin",
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
          return (
            <ButtonInterview
              size="small"
              variant="outlined"
              onClick={() =>
                props.history.push(
                  `kandidat/interview?page=${props.activePage}&id=${value}`
                )
              }
            >
              Interview
            </ButtonInterview>
          );
        },
      },
    },
  ];

  const options = {
    filter: true,
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
    rowsPerPage: 10,
    rowsPerPageOptions: [10, 50, 100],
  };

  const handleChangePage = async (page) => {
    try {
      await props.getkandidat({ page });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <MUIDataTable
        data={props.kandidates}
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
