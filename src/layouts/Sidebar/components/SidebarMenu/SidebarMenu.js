import React from "react";
import PropTypes from "prop-types";
import {
  Icon,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";

const SidebarMenu = (props) => {
  return (
    <ListItem
      disablePadding
      sx={{ display: "block" }}
      button
      component={Link}
      to={props.data.path}
      selected={props.pathname === props.data.path}
    >
      <ListItemButton
        sx={{
          minHeight: 48,
          px: 2.5,
          justifyContent: props.open ? "initial" : "center",
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: props.open ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          <Icon>{props.data.icon}</Icon>
        </ListItemIcon>
        <ListItemText
          primary={props.data.title}
          sx={{ opacity: props.open ? 1 : 0 }}
        />
      </ListItemButton>
    </ListItem>
  );
};

SidebarMenu.propTypes = {
  data: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default SidebarMenu;
