import AppFormTitle from "../components/AppFormTitle";
import AppView from "../components/AppView";
import { Form, Formik } from "formik";
import { Box, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LoginBodySchema } from "../schemas";
import { useAuth } from "../components/AuthContext";
import FormikTextField from "../components/FormikTextField";
import FormikPasswordField from "../components/FormikPasswordField";
import { useAsyncError } from "../hooks/use-async";

const textFieldStyle = {
  width: 328,
  mt: 3
};

const centered = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

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
          maxHeight: 700
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
              {/* Textfields container */}
              <Box sx={{ ...centered, flexDirection: "column" }}>
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
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
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
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </AppView>
  );
};

export default LoginView;
