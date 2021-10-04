import React from "react";
import { Box, Button, TextField } from "@mui/material";
import AppFormTitle from "../components/AppFormTitle";
import AppView from "../components/AppView";

const textFieldStyle = {
  width: 328,
  mt: 3
};

const centered = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const RegisterForm = (handleChange, handleSubmit) => {
  return (
    <AppView>
      {/* Outer Border */}
      <Box
        sx={{
          backgroundColor: "transparent",
          border: theme => `2px solid ${theme.palette.primary.main}`,
          borderRadius: 3,
          my: 2,
          flexGrow: 1,
          maxWidth: 688,
          padding: 4
        }}
      >
        <AppFormTitle title="Create Account" />
        <form onSubmit={handleSubmit} style={centered}>
          {/* Textfields container */}
          <Box sx={{ ...centered, flexDirection: "column" }}>
            <TextField
              variant="outlined"
              label="Name"
              placeholder="Name"
              onChange={handleChange}
              color="primary"
              sx={textFieldStyle}
            />
            <TextField
              variant="outlined"
              label="Username"
              placeholder="Username"
              onChange={handleChange}
              color="primary"
              sx={textFieldStyle}
            />
            <TextField
              variant="outlined"
              label="Password"
              placeholder="Password"
              type="password"
              onChange={handleChange}
              color="primary"
              sx={textFieldStyle}
            />
            <TextField
              variant="outlined"
              label="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              onChange={handleChange}
              color="primary"
              sx={textFieldStyle}
            />
            <Button
              onSubmit={handleSubmit}
              variant="contained"
              color="primary"
              sx={{
                mt: 2,
                alignSelf: "flex-end"
              }}
            >
              Sign Up
            </Button>
          </Box>
        </form>
      </Box>
    </AppView>
  );
};

export default RegisterForm;
