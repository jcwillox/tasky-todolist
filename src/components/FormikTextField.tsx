import React, { useMemo } from "react";
import { useFormikContext } from "formik";
import { capitalize, TextField } from "@mui/material";
import { TextFieldProps } from "@mui/material/TextField/TextField";

const FormikTextField = ({ name, label, ...props }: TextFieldProps) => {
  const { handleChange, handleBlur, touched, errors, values } =
    useFormikContext();
  if (!name) {
    throw new Error("FormikTextField must have a name");
  }
  const autoLabel = useMemo(
    () => (label ? label : capitalize(name!)),
    [label, name]
  );
  return (
    <TextField
      id={name}
      name={name}
      label={autoLabel}
      variant="outlined"
      value={(values as {})[name]}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched[name] && Boolean(errors[name])}
      helperText={touched[name] && capitalize(errors[name] || "")}
      {...props}
    />
  );
};

export default FormikTextField;
