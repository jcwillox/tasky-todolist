import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const textFieldStyle = {
  width: 328,
  mt: 3
};

const centered = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const validationSchema = yup.object({
  name: yup.string().required("Your name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please retype your password")
});

const RegisterForm = (handleChange, handleSubmit) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },

    validationSchema: validationSchema,
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
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
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="john.smith@gmail.com"
          variant="outlined"
          onChange={formik.handleChange}
          color="primary"
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
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
          id="password"
          name="password"
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
  );
};

export default RegisterForm;
