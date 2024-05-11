import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box, Button, InputBase } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import DensityMediumIcon from "@mui/icons-material/DensityMedium";
import SettingsIcon from "@mui/icons-material/Settings";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { useNavigate } from "react-router-dom";
import AllFiles from "../pages/AllFiles";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function Navbar(props) {
  const [searchQuery, setSearchQuery] = useState("");
  props.setSearchQuery(searchQuery);
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openRecents, setOpenRecents] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const handleClickRecents = () => {
    setOpenRecents(!openRecents);
  };

  const handleClickSettings = () => {
    setOpenSettings(!openSettings);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = () => (
    <Box sx={{ width: 300, paddingTop: 2 }} role="presentation">
      <List>
        <Typography variant="h6" textAlign="center">
          AFOTE
        </Typography>
        <ListItem onClick={handleClickRecents}>
          <ScheduleIcon />
          <ListItemText primary="Recents" />
          {openRecents ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openRecents} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText primary="APT Report" />
            </ListItem>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText primary="OS Proposal" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem onClick={handleClickSettings}>
          <SettingsIcon />
          <ListItemText primary="Settings" />
          {openSettings ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openSettings} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText primary="Preferences" />
            </ListItem>
            <ListItem sx={{ pl: 4 }}>
              <ListItemText primary="Account Settings" />
            </ListItem>
          </List>
        </Collapse>
        <ListItem>
          <HelpOutlineIcon />
          <ListItemText primary="Help & Feedback" />
        </ListItem>
        <Link
          to="/"
          style={{ textDecoration: "none" }}
          onClick={() => {
            Cookies.remove("token");
            Cookies.remove("username");
            window.location.reload();
          }}
        >
          <ListItem >
            <ListItemIcon>
              <LogoutIcon sx={{ color: "red" }} />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ color: "red" }} />
          </ListItem>{" "}
        </Link>
      </List>
    </Box>
  );

  const my_pages = ["Your Files"];
  const routes = [<AllFiles />];
  const my_settings = ["Profile", "Account"];

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenSettingsMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseSettingsMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Button
          sx={{ my: 1, color: "white", display: "block", marginLeft: -1 }}
          onClick={toggleDrawer(true)}
        >
          <DensityMediumIcon
            sx={{ marginTop: 1, fontSize: 30, color: "white" }}
          />
        </Button>
        
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            fontWeight: 200,
            fontFamily: "roboto",
            color: "white",
            letterSpacing: ".2rem",
            textDecoration: "none",
          }}
        >
         AFOTE
        </Typography>
        <Box sx={{ flexWrap: "wrap", flexGrow: 1, display: "flex" }}>
          {my_pages.map((page) => (
            <Button
              onClick={() => navigate("/all")}
              key={my_pages}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {page}
            </Button>
          ))}
          <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
            <SearchIcon />
            <InputBase
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ ml: 1, color: "white" }}
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Box>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open Profile">
            <IconButton onClick={handleOpenSettingsMenu} sx={{ p: 0 }}>
              <Avatar alt={localStorage.getItem("username")} src= "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.biography.com%2Fscientists%2Falbert-einstein&psig=AOvVaw1FXxL7UItPlPWYX1gmAbIN&ust=1715265845850000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCICiuLGl_oUDFQAAAAAdAAAAABAE" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "55px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseSettingsMenu}
          >
            {my_settings.map((setting) => (
              <MenuItem key={setting} onClick={handleCloseSettingsMenu}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
      <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </AppBar>
  );
}
