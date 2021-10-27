import React, { useState } from "react";
import { Box, Button, Link, Typography } from "@mui/material";
import Jdenticon from "../components/Jdenticon";
import { useAuth } from "../components/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditUserDialog from "../components/EditUserDialogs";

const AccountView = () => {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
      }}
    >
      <Button
        component={Link}
        href="/tasks"
        variant="contained"
        fullWidth
        startIcon={<ArrowBackIcon />}
        sx={{
          height: 50,
          width: 200,
          minWidth: 180
        }}
      >
        Return to Tasks
      </Button>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column"
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
          {user!.name || user!.username}
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
            onClick={() => setOpen(!open)}
          >
            Edit Username
          </Button>
          <EditUserDialog open={open} onClose={() => setOpen(!open)} />
          <Button fullWidth endIcon={<EditIcon />}>
            Change Password
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountView;
