import React, { useState, MouseEvent } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Badge,
  MenuItem,
  InputBase,
  Avatar,
  Popover,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Logout as LogoutIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getRole, isUrlOrFileName } from "../../Utils/GetFunctions";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { logoutUser } from "../../Features/authSlice";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "rgba(102, 185, 206, 0.527)",
  color: "#000000",
  boxShadow: "none",
  zIndex: theme.zIndex.drawer + 1,
  position: "relative",
  width: "100%",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginLeft: theme.spacing(2),
  width: "250px",
  [theme.breakpoints.down("sm")]: {
    width: "150px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: alpha(theme.palette.common.black, 0.54),
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] =
    useState<null | HTMLElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const auth = useSelector((state: any) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cargo = getRole(auth);

  const handleProfileMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (event: MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };


  const handleLogout = () => {
    dispatch(logoutUser());
    setTimeout(() => {
      navigate("/", { replace: true });
    }, 0);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const isMenuOpen = Boolean(anchorEl);
  const isNotificationOpen = Boolean(notificationAnchor);

  const profileImage =
    isUrlOrFileName(auth.Img) === "URL"
      ? auth.Img
      : `http://localhost:5173/upload/${auth.Img}`;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar>
        <Toolbar>
          <Breadcrumb />

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Pesquisar..."
                inputProps={{ "aria-label": "search" }}
              />
            </Search>

            <IconButton
              color="primary"
              onClick={toggleDarkMode}
              sx={{ border: "1px solid rgba(0, 0, 0, 0.12)" }}
            >
              {isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>

            <IconButton
              color="primary"
              onClick={handleNotificationClick}
              sx={{ border: "1px solid rgba(0, 0, 0, 0.12)" }}
            >
              <Badge badgeContent={2} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              edge="end"
              onClick={handleProfileMenuOpen}
              sx={{
                border: "1px solid rgba(0, 0, 0, 0.12)",
                p: 0.5,
              }}
            >
              <Avatar
                alt={auth.name}
                src={profileImage}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </StyledAppBar>

      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate(`/${cargo}/perfil`)}>
          <AccountCircle sx={{ mr: 1 }} />
          Perfil
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <LogoutIcon sx={{ mr: 1 }} />
          Logout
        </MenuItem>
      </Menu>

      <Popover
        open={isNotificationOpen}
        anchorEl={notificationAnchor}
        onClose={handleNotificationClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box sx={{ p: 2, maxWidth: 300 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Notificações
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            This is a static notification message!
          </Typography>
          <Typography variant="body2">
            This is another static notification message!
          </Typography>
        </Box>
      </Popover>
    </Box>
  );
};

export default Header;
