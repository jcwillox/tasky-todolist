import React from "react";
import { Box, Button, Fade, Typography } from "@mui/material";
import Jdenticon from "../components/Jdenticon";
import { useAuth } from "../components/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import EditUserDialog from "../components/EditUserDialog";
import ChangePasswordDialog from "../components/ChangePasswordDialog";
import { bindDialog, usePopoverState } from "../utils/popup-state";
import { bindTrigger } from "material-ui-popup-state/hooks";

const AccountView = () => {
  const { user } = useAuth();
  const editDialog = usePopoverState("editUserDialog");
  const passwordDialog = usePopoverState("changePasswordDialog");
  return (
    <Fade in={true}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          alignItems: "center",
          p: 2
        }}
      >
        <Jdenticon value={user!.name || user!.username} size={250} />
        <Typography variant="h3" color="primary">
          {user!.name}
        </Typography>
        <Typography variant="subtitle1">{user!.username}</Typography>
        <Box
          sx={{
            display: "inline-flex",
            flexDirection: "column",
            mt: 1.2
          }}
        >
          <Button fullWidth endIcon={<EditIcon />} {...bindTrigger(editDialog)}>
            Edit Username
          </Button>
          <Button
            fullWidth
            endIcon={<EditIcon />}
            {...bindTrigger(passwordDialog)}
          >
            Change Password
          </Button>
          <EditUserDialog {...bindDialog(editDialog)} />
          <ChangePasswordDialog {...bindDialog(passwordDialog)} />
        </Box>
      </Box>
    </Fade>
  );
};

export default AccountView;
