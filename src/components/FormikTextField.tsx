import React from "react";
import { useFormikContext } from "formik";
import { capitalize, TextField } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField/TextField";

const FormikTextField = (props: TextFieldProps) => {
  const { handleChange, handleBlur, touched, errors } = useFormikContext();
  return (
    <TextField
      id={props.name}
      variant="outlined"
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched[props.name!] && Boolean(errors[props.name!])}
      helperText={touched[props.name!] && capitalize(errors[props.name!] || "")}
      {...props}
    />
  );
};

export default FormikTextField;
