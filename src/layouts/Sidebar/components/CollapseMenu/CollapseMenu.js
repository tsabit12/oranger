import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Collapse,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const CollapseMenu = (props) => {
  const { data } = props;
  const [opencollapse, setopencollapse] = useState(false);

  const handleClick = () => setopencollapse(!opencollapse);

  return (
    <React.Fragment>
      <ListItem
        disablePadding
        sx={{ display: "block" }}
        button
        onClick={handleClick}
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
          {opencollapse ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={opencollapse} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data.submenu.map((row, index) => (
            <ListItemButton
              key={index}
              sx={{ pl: 4 }}
              component={Link}
              to={row.path}
              selected={props.pathname === row.path}
            >
              <ListItemIcon>
                <Icon>{row.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={row.title} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

CollapseMenu.propTypes = {
  data: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default CollapseMenu;
