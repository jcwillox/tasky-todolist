import React from "react";
import AppFormTitle from "../components/AppFormTitle";
import AppView from "../components/AppView";
import { Form, Formik } from "formik";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { RegisterConfirmSchema } from "../schemas";
import { useAuth } from "../components/AuthContext";
import FormikTextField from "../components/FormikTextField";
import FormikPasswordField from "../components/FormikPasswordField";
import { useAsyncError } from "../hooks/use-async";

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

const RegisterView = () => {
  const auth = useAuth();
  const wrapAsync = useAsyncError();
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
        <Formik
          initialValues={{
            name: "",
            username: "",
            password: "",
            confirmPassword: ""
          }}
          validationSchema={RegisterConfirmSchema}
          onSubmit={async values => {
            await wrapAsync(auth.register(values));
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box sx={{ ...centered, flexDirection: "column" }}>
                <FormikTextField
                  name="name"
                  label="Name"
                  placeholder="John Smith"
                  sx={textFieldStyle}
                />
                <FormikTextField
                  name="username"
                  label="Username"
                  placeholder="john.smith"
                  sx={textFieldStyle}
                />
                <FormikPasswordField
                  name="password"
                  label="Password"
                  placeholder="Password"
                  sx={textFieldStyle}
                />
                <FormikPasswordField
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  sx={textFieldStyle}
                />
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  sx={{
                    mt: 2,
                    alignSelf: "flex-end"
                  }}
                >
                  {(isSubmitting && "") || "Sign Up"}
                </LoadingButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </AppView>
  );
};

export default RegisterView;
