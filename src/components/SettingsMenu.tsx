import React from "react";
import { useAuth } from "./AuthContext";
import {
  capitalize,
  Divider,
  IconButton,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip
} from "@mui/material";
import Jdenticon from "./Jdenticon";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  InvertColors as InvertColorsIcon,
  Logout as LogoutIcon,
  MoreVert as MoreVertIcon,
  RestoreOutlined as RestoreOutlinedIcon
} from "@mui/icons-material";
import { bindMenu, bindTrigger } from "material-ui-popup-state/hooks";
import { useThemeMode } from "./ThemeModeContext";
import { usePopoverState } from "../utils/popup-state";
import LoadingMenuItem from "./LoadingMenuItem";

const SettingsMenu = () => {
  const { user, logout, resetDB } = useAuth();
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
            minWidth: 200
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
          Theme: {capitalize(themeMode)}
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
        <Divider />
        <LoadingMenuItem
          onClick={resetDB}
          icon={<RestoreOutlinedIcon fontSize="small" />}
        >
          Reset Database
        </LoadingMenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default SettingsMenu;
