import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Logout from "@mui/icons-material/Logout";
import ListItemIcon from "@mui/material/ListItemIcon";
import "./Navbar.css";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth0();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="home-nav">
      <div className="home-nav_logo">
        <img src={logo} alt="logo" style={{ width: "35px" }} />
        <div>Planner</div>
      </div>
      {isAuthenticated && (
        <div>
          <img
            src={user.picture}
            alt="profile-pic"
            onClick={handleClick}
            style={{ width: "30px", cursor: "pointer" }}
          />
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem
              onClick={() => {
                logout({
                  returnTo: window.location.origin,
                });
              }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default Navbar;
