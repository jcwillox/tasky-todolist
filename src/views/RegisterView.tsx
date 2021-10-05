import React from "react";
import AppFormTitle from "../components/AppFormTitle";
import AppView from "../components/AppView";
import { useFormik } from "formik";
import { Box, Button, TextField } from "@mui/material";
import { RegisterConfirmSchema } from "../schemas";
import { useAuth } from "../components/AuthContext";

/**
 * Register Page
 *
 */

const textFieldStyle = {
  width: 328,
  mt: 3
};

const centered = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const validationSchema = RegisterConfirmSchema;

const RegisterView = () => {
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      await auth.register(values);
    }
  });

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
        <form onSubmit={formik.handleSubmit}>
          {/* Textfields container */}
          <Box sx={{ ...centered, flexDirection: "column" }}>
            <TextField
              id="name"
              name="name"
              label="Name"
              placeholder="John Smith"
              variant="outlined"
              onChange={formik.handleChange}
              color="primary"
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={textFieldStyle}
            />
            <TextField
              id="username"
              name="username"
              label="Username"
              placeholder="johnsmith123"
              variant="outlined"
              onChange={formik.handleChange}
              color="primary"
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              sx={textFieldStyle}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="Password"
              variant="outlined"
              onChange={formik.handleChange}
              color="primary"
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              sx={textFieldStyle}
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              variant="outlined"
              placeholder="Confirm Password"
              onChange={formik.handleChange}
              color="primary"
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              sx={textFieldStyle}
            />
            <Button
              type="submit"
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

export default RegisterView;
