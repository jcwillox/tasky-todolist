import React, { useState } from "react";
import { TextFieldProps } from "@mui/material/TextField/TextField";
import FormikTextField from "./FormikTextField";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const FormikPasswordField = (props: TextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormikTextField
      {...props}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={e => e.preventDefault()}
              edge="end"
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

export default FormikPasswordField;
