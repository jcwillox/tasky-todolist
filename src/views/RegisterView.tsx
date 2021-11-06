import React from "react";
import AppFormTitle from "../components/AppFormTitle";
import AppView from "../components/AppView";
import { Form as FormikForm, Formik } from "formik";
import { Box, Button, styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { RegisterConfirmSchema } from "../schemas";
import { useAuth } from "../components/AuthContext";
import FormikTextField from "../components/FormikTextField";
import FormikPasswordField from "../components/FormikPasswordField";
import { useAsyncError } from "../hooks/use-async";
import { ApiValidationError } from "../utils/fetch";

const Form = styled(FormikForm)({
  maxWidth: 328,
  marginTop: 8
});

const RegisterView = () => {
  const auth = useAuth();
  const wrapAsync = useAsyncError();
  return (
    <AppView>
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
          p: 2
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
          onSubmit={async (values, { setFieldError }) => {
            await wrapAsync(
              auth.register(values).catch(err => {
                if (err instanceof ApiValidationError) {
                  err.errors.forEach(item => {
                    setFieldError(item.path, item.message);
                  });
                } else {
                  throw err;
                }
              })
            );
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormikTextField
                name="name"
                autoComplete="name"
                autoFocus
                placeholder="John Smith"
                margin="dense"
                fullWidth
              />
              <FormikTextField
                name="username"
                autoComplete="username"
                placeholder="john.smith"
                margin="dense"
                fullWidth
                required
              />
              <FormikPasswordField
                name="password"
                autoComplete="new-password"
                placeholder="Password"
                margin="dense"
                fullWidth
                required
              />
              <FormikPasswordField
                name="confirmPassword"
                autoComplete="new-password"
                label="Confirm Password"
                placeholder="Confirm Password"
                margin="dense"
                fullWidth
                required
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2
                }}
              >
                <Button href="/login">Sign in instead</Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  {(isSubmitting && "") || "Create account"}
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
