import React from "react";
import AppFormTitle from "../components/AppFormTitle";
import AppView from "../components/AppView";
import RegisterForm from "../components/RegisterForm";
import Box from "@mui/material/Box";

const RegisterView = () => {
  return (
    <AppView>
      {/* Outer Border */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          border: theme => `2px solid ${theme.palette.primary.main}`,
          borderRadius: 3,
          maxWidth: 688,
          maxHeight: 700
        }}
      >
        <AppFormTitle title="Create Account" />
        <RegisterForm />
      </Box>
    </AppView>
  );
};

export default RegisterView;
