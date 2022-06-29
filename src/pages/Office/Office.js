import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getdata } from "../../actions/offices";
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";
import { Box, CircularProgress, Icon, Typography } from "@mui/material";

const LIMIT = 13;

const Office = (props) => {
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setisLoading(true);
      try {
        await props.getdata({ limit: LIMIT, page: 0 }, 0);
      } catch (error) {
        let message = "Internal server error";
        if (error.message) {
          message = error.message;
        }

        alert(message);
      }
      setisLoading(false);
    })();
  }, []);

  const handleChangePage = async (page) => {
    const newoffset = page * LIMIT;
    setisLoading(true);
    try {
      await props.getdata(
        {
          page: newoffset,
          limit: LIMIT,
        },
        page
      );
    } catch (error) {
      console.log(error);
    }

    setisLoading(false);
  };

  const columns = [
    {
      name: "id_wilayah",
      label: "#",
      options: {
        customBodyRender: (value, tableMeta) => {
          if (isLoading && props.list.length === 0) {
            return <span>Loading...</span>;
          } else {
            let rowIndex =
              props.activePage * LIMIT + (Number(tableMeta.rowIndex) + 1);
            return <span>{rowIndex}</span>;
          }
        },
      },
    },
    {
      name: "id_wilayah",
      label: "Regional",
    },
    {
      name: "kprk",
      label: "Kprk",
    },
    {
      name: "nopend",
      label: "Nopend",
    },
    {
      name: "NamaKtr",
      label: "Nama Kantor",
    },
    {
      name: "jenis_kantor",
      label: "Jenis",
    },
    {
      name: "kode_pos",
      label: "Kodepos",
    },
    {
      name: "PSO",
      label: "PSO",
    },
    {
      name: "nopend",
      label: "Update",
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
        customBodyRender: () => {
          if (isLoading && props.list.length === 0) return null;
          return (
            <Box sx={{ cursor: "pointer" }}>
              <Icon sx={{ color: "#1976d2" }}>mode</Icon>
            </Box>
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
  };

  return (
    <MUIDataTable
      title={
        <Typography>
          DATA REFERENSI KANTOR{" "}
          {isLoading && (
            <CircularProgress
              size={24}
              sx={{ marginLeft: 4, position: "relative", top: 4 }}
            />
          )}
        </Typography>
      }
      data={isLoading && props.list.length === 0 ? [["Loading.."]] : props.list}
      columns={columns}
      options={options}
    />
  );
};

Office.propTypes = {
  getdata: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  list: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  const { page, data, total } = state.offices;
  let list = [];

  if (data[page]) list = data[page];
  return {
    list,
    count: total,
    activePage: page,
  };
}

export default connect(mapStateToProps, { getdata })(Office);
