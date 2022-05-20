import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const Sidebar = (props) => {
  const { children } = props;

  return (
    <Box sx={{ padding: "10px 10px" }}>
      <Typography>Title</Typography>
      {children}
    </Box>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Sidebar;
