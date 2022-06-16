import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getBerkas, updateBerkas, addBerkas } from "../../actions/references";
import MUIDataTable from "mui-datatables";
import { Chip, Icon, IconButton, Tooltip } from "@mui/material";
import { ModalAdd, ModalUpdate } from "./components";

const Berkas = (props) => {
  const [loading, setloading] = useState(false);
  const [updateData, setupdateData] = useState({
    visible: false,
    data: {},
  });
  const [add, setadd] = useState(false);

  useEffect(() => {
    (async () => {
      setloading(true);

      await props.getBerkas();

      setloading(false);
    })();
  }, []);

  const columns = [
    {
      name: "berkasid",
      label: "#",
      options: {
        customBodyRender: (value, tableMeta) => {
          if (loading && props.list.length === 0) {
            return <span>Loading...</span>;
          }
          let rowIndex = Number(tableMeta.rowIndex) + 1;
          return <span>{rowIndex}</span>;
        },
      },
    },
    {
      name: "berkasid",
      label: "ID",
    },
    {
      name: "keterangan",
      label: "DESKRIPSI",
    },
    {
      name: "with_file",
      label: "DENGAN FILE",
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
          if (loading && props.list.length === 0) return null;

          return (
            <Chip
              label={Number(value) === 1 ? "Ya" : "Tidak"}
              color={Number(value) === 0 ? "success" : "primary"}
              variant="outlined"
            />
          );
        },
      },
    },
    {
      name: "berkasid",
      label: "UPDATE",
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
          if (loading && props.list.length === 0) return null;
          return (
            <IconButton
              size="small"
              sx={{ margin: 0 }}
              color="primary"
              onClick={() => onClickUpdate(value)}
            >
              <Icon>mode</Icon>
            </IconButton>
          );
        },
      },
    },
  ];

  const options = {
    filter: false,
    sort: false,
    search: false,
    download: false,
    selectableRows: "none",
    customToolbar: () => {
      return (
        <IconButton onClick={() => setadd(true)}>
          <Tooltip title={"Tambah berkas"}>
            <Icon>add</Icon>
          </Tooltip>
        </IconButton>
      );
    },
  };

  const onClickUpdate = (value) => {
    const find = props.list.find((row) => row.berkasid === value);
    if (find) {
      setupdateData((prev) => ({ ...prev, visible: true, data: find }));
    }
  };

  return (
    <Box>
      <ModalUpdate
        data={updateData}
        onClose={() => setupdateData((prev) => ({ ...prev, visible: false }))}
        onUpdate={props.updateBerkas}
      />
      <ModalAdd
        visible={add}
        onClose={() => setadd(false)}
        onAdd={props.addBerkas}
      />
      <MUIDataTable
        title="DATA REFERENSI BERKAS"
        data={loading && props.list.length === 0 ? [["Loading.."]] : props.list}
        options={options}
        columns={columns}
      />
    </Box>
  );
};

Berkas.propTypes = {
  list: PropTypes.array.isRequired,
  getBerkas: PropTypes.func.isRequired,
  updateBerkas: PropTypes.func.isRequired,
  addBerkas: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    list: state.references.berkas,
  };
}

export default connect(mapStateToProps, { getBerkas, updateBerkas, addBerkas })(
  Berkas
);
