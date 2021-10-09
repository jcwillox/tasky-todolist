import React from "react";
import { useAuth } from "./AuthContext";
import {
  capitalize,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip
} from "@mui/material";
import Jdenticon from "./Jdenticon";
import {
  InvertColors as InvertColorsIcon,
  Logout as LogoutIcon,
  MoreVert as MoreVertIcon
} from "@mui/icons-material";
import {
  bindMenu,
  bindTrigger,
  usePopupState
} from "material-ui-popup-state/hooks";
import { useThemeMode } from "./ThemeModeContext";

const SettingsMenu = () => {
  const { user, logout } = useAuth();
  const { themeMode, switchThemeMode } = useThemeMode();
  const popupState = usePopupState({
    variant: "popover",
    popupId: "settingsMenu"
  });

  return (
    <React.Fragment>
      <Tooltip title="Settings">
        <IconButton color="inherit" {...bindTrigger(popupState)}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        {...bindMenu(popupState)}
        sx={{
          "& .MuiPaper-root": {
            minWidth: 180
          }
        }}
      >
        {user && (
          <MenuItem
            sx={{
              textTransform: "capitalize"
            }}
          >
            <Jdenticon
              value={user.name || user.username}
              size={32}
              sx={{
                ml: -0.5,
                mr: 1
              }}
            />
            {user.name || user.username}
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
              popupState.close();
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
