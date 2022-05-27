import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/system";
import {
  CssBaseline,
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, BootstrapTooltip, Drawer, DrawerHeader } from "./components";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTheme } from "@emotion/react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { connect } from "react-redux";
import { setLoggedOut } from "../../actions/auth";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Sidebar = (props) => {
  const { pathname } = useLocation();

  const { children } = props;
  const theme = useTheme();
  const [open, setopen] = useState(true);
  const [title, settitle] = useState("");

  useEffect(() => {
    if (pathname) {
      const findPath = props.menus.find((row) => row.path === pathname);
      if (findPath) {
        settitle(findPath.title);
      }
    }
  }, [pathname]);

  const handleDrawerOpen = () => setopen(true);

  const handleDrawerClose = () => setopen(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <div>
            <BootstrapTooltip title="Logout">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => props.setLoggedOut()}
                color="inherit"
                disableRipple
              >
                <ExitToAppIcon />
              </IconButton>
            </BootstrapTooltip>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {props.menus.map((row, index) => (
            <ListItem
              key={index}
              disablePadding
              sx={{ display: "block" }}
              component={Link}
              to={row.path}
              button
              selected={pathname === row.path}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Icon>{row.icon}</Icon>
                </ListItemIcon>
                <ListItemText
                  primary={row.title}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
  setLoggedOut: PropTypes.func.isRequired,
  menus: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    menus: state.menus,
  };
}

export default connect(mapStateToProps, { setLoggedOut })(Sidebar);
