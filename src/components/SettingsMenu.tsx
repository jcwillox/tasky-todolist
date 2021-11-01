import React from "react";
import { useAuth } from "./AuthContext";
import {
  capitalize,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip
} from "@mui/material";
import Jdenticon from "./Jdenticon";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  InvertColors as InvertColorsIcon,
  Logout as LogoutIcon,
  MoreVert as MoreVertIcon
} from "@mui/icons-material";
import { bindMenu, bindTrigger } from "material-ui-popup-state/hooks";
import { useThemeMode } from "./ThemeModeContext";
import { usePopoverState } from "../utils/popup-state";

const SettingsMenu = () => {
  const { user, logout } = useAuth();
  const { themeMode, switchThemeMode } = useThemeMode();
  const menu = usePopoverState("settingsMenu");

  return (
    <React.Fragment>
      <Tooltip title="Settings">
        <IconButton color="inherit" {...bindTrigger(menu)}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        {...bindMenu(menu)}
        sx={{
          "& .MuiPaper-root": {
            minWidth: 180
          }
        }}
      >
        {user && (
          <MenuItem
            onClick={menu.close}
            component={Link}
            href="/account"
            sx={{
              textTransform: "capitalize"
            }}
          >
            <Jdenticon
              value={user.name}
              size={32}
              sx={{
                ml: -0.5,
                mr: 1
              }}
            />
            {user.name}
          </MenuItem>
        )}
        {user?.group === "admin" && (
          <MenuItem component={Link} href="/admin" onClick={menu.close}>
            <ListItemIcon>
              <AdminPanelSettingsIcon fontSize="small" />
            </ListItemIcon>
            Admin Panel
          </MenuItem>
        )}
        {user && <Divider />}
        <MenuItem onClick={switchThemeMode}>
          <ListItemIcon>
            <InvertColorsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Theme: {capitalize(themeMode)}</ListItemText>
        </MenuItem>
        {user && (
          <MenuItem
            onClick={() => {
              menu.close();
              logout();
            }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        )}
      </Menu>
    </React.Fragment>
  );
};

export default SettingsMenu;
