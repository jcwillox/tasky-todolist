import React, { useState } from "react";
import { Box, Button, Fade, Typography } from "@mui/material";
import Jdenticon from "../components/Jdenticon";
import { useAuth } from "../components/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import EditUserDialog from "../components/EditUserDialog";
import ChangePasswordDialog from "../components/ChangePasswordDialog";

const AccountView = () => {
  const { user } = useAuth();
  const [openEditUser, setEditUserOpen] = useState(false);
  const [openChangePassword, setChangePasswordOpen] = useState(false);
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
          <Button
            fullWidth
            endIcon={<EditIcon />}
            onClick={() => setEditUserOpen(true)}
          >
            Edit Username
          </Button>
          <EditUserDialog
            open={openEditUser}
            onClose={() => setEditUserOpen(false)}
          />
          <Button
            fullWidth
            endIcon={<EditIcon />}
            onClick={() => setChangePasswordOpen(true)}
          >
            Change Password
          </Button>
          <ChangePasswordDialog
            open={openChangePassword}
            onClose={() => setChangePasswordOpen(false)}
          />
        </Box>
      </Box>
    </Fade>
  );
};

export default AccountView;
