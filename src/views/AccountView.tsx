import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: theme => `2px solid ${theme.palette.primary.main}`,
        borderRadius: 3
      }}
    >
      <Jdenticon value={user!.name || user!.username} size={300} />
      <Typography
        variant="h2"
        color="primary"
        sx={{
          alignSelf: "center"
        }}
      >
        {user!.name}
      </Typography>
      <Typography variant="subtitle1" color="primary">
        {user!.username}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flex: 1
        }}
      >
        <Button
          fullWidth
          endIcon={<EditIcon />}
          onClick={() => setEditUserOpen(!openEditUser)}
        >
          Edit Username
        </Button>
        <EditUserDialog
          open={openEditUser}
          onClose={() => setEditUserOpen(!openEditUser)}
        />
        <Button
          fullWidth
          endIcon={<EditIcon />}
          onClick={() => setChangePasswordOpen(!openChangePassword)}
        >
          Change Password
        </Button>
        <ChangePasswordDialog
          open={openChangePassword}
          onClose={() => setChangePasswordOpen(!openChangePassword)}
        />
      </Box>
    </Box>
  );
};

export default AccountView;
