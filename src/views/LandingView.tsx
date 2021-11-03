import React from "react";
import AppLogo from "../components/AppLogo";
import { Box, Button, Grow, Typography } from "@mui/material";

const LandingView = () => {
  return (
    <Grow in>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          mt: {
            xs: 4,
            md: 5
          }
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: {
              xs: "column",
              sm: "row"
            },
            textAlign: {
              xs: "center",
              sm: "initial"
            }
          }}
        >
          <AppLogo
            shadow
            sx={{
              width: {
                xs: 100,
                md: 140
              }
            }}
          />
          <Box
            sx={{
              ml: { sm: 6 },
              mt: { xs: 2, sm: 0 }
            }}
          >
            <Typography variant="h3">Tasky</Typography>
            <Typography variant="subtitle1" sx={{ ml: 1 }}>
              A fast, modern and responsive to-do list application
            </Typography>
          </Box>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Button href="/register" sx={{ mr: 2 }}>
            Create Account
          </Button>
          <Button href="/login" variant="contained">
            Sign In
          </Button>
        </Box>
      </Box>
    </Grow>
  );
};

export default LandingView;
