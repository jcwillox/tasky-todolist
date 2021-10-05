import { useState } from "react";
import AppFormTitle from "../components/AppFormTitle";
import AppView from "../components/AppView";
import { useFormik } from "formik";
import {
  Box,
  IconButton,
  Button,
  InputAdornment,
  TextField
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { RegisterConfirmSchema } from "../schemas";
import { useAuth } from "../components/AuthContext";

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

const LoginView = () => {
  const [values, setValues] = useState({
    password: "",
    showPassword: false
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: validationSchema,
    onSubmit: async values => {
      await auth.login(values);
    }
  });

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
        <form onSubmit={formik.handleSubmit}>
          {/* Textfields container */}
          <Box sx={{ ...centered, flexDirection: "column" }}>
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
              type={values.showPassword ? "text" : "password"}
              label="Password"
              placeholder="Password"
              variant="outlined"
              onChange={formik.handleChange}
              color="primary"
              error={formik.touched.password && Boolean(formik.errors.password)}
              sx={textFieldStyle}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%"
              }}
            >
              <Button
                href="/register"
                sx={{
                  mt: 2,
                  alignSelf: "flex-start",
                  paddingLeft: "0px"
                }}
              >
                Create Account
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  alignSelf: "flex-end"
                }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </AppView>
  );
};

export default LoginView;
