import AppFormTitle from "../components/AppFormTitle";
import AppView from "../components/AppView";
import { Form as FormikForm, Formik } from "formik";
import { Box, Button, styled } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LoginBodySchema } from "../schemas";
import { useAuth } from "../components/AuthContext";
import FormikTextField from "../components/FormikTextField";
import FormikPasswordField from "../components/FormikPasswordField";
import { useAsyncError } from "../hooks/use-async";

const Form = styled(FormikForm)({
  maxWidth: 328,
  marginTop: 8
});

const LoginView = () => {
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
        <AppFormTitle title="Sign In" />
        <Formik
          initialValues={{
            username: "",
            password: ""
          }}
          validationSchema={LoginBodySchema}
          onSubmit={async values => {
            await wrapAsync(auth.login(values));
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormikTextField
                name="username"
                autoComplete="username"
                placeholder="john.smith"
                margin="dense"
                fullWidth
              />
              <FormikPasswordField
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                margin="dense"
                fullWidth
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2
                }}
              >
                <Button href="/register">Create Account</Button>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  {(isSubmitting && "") || "Sign In"}
                </LoadingButton>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </AppView>
  );
};

export default LoginView;
