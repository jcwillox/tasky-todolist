import { useState } from "react";
import { ReactComponent as LogoIcon } from "../assets/logo.svg";
import {
  Button,
  Paper,
  TextField,
  Typography,
  Container,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../components/AuthContext";

const LoginView = () => {
  const [values, setValues] = useState({
    password: "",
    showPassword: false
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  const auth = useAuth();
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        backgroundColor: "transparent",
        border: theme => `2px solid ${theme.palette.primary.main}`,
        borderRadius: 3,
        marginTop: 5,
        flexGrow: 1,
        padding: 4
      }}
      variant="outlined"
    >
      <LogoIcon
        style={{
          filter: "drop-shadow(3px 3px 3px rgb(0 0 0 / 0.2))",
          alignSelf: "center",
          width: "150px",
          height: "150px"
        }}
      />

      <Typography
        variant="h6"
        color="primary"
        style={{
          marginTop: "60px"
        }}
      >
        Sign In
      </Typography>

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "30px",
          marginBottom: "30px"
        }}
      >
        <FormControl
          variant="outlined"
          sx={{
            alignSelf: "center",
            width: "500px",
            marginBottom: "50px"
          }}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Username
          </InputLabel>

          <OutlinedInput label="Username" />
        </FormControl>

        <FormControl
          variant="outlined"
          sx={{
            alignSelf: "center",
            width: "500px"
          }}
        >
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>

          <OutlinedInput
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </Container>

      <div>
        <Button
          onClick={() =>
            auth.login({ username: "david", password: "secret123" })
          }
          style={{
            marginRight: "200px"
          }}
        >
          Create Account
        </Button>
        <Button variant="contained" href="/register">
          Sign In
        </Button>
      </div>
    </Paper>
  );
};

export default LoginView;
