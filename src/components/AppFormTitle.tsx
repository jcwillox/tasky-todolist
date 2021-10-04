import React from "react";
import { Box, Typography } from "@mui/material";
import AppLogo from "./AppLogo";
type AppFormTitleProps = {
  title: string;
};

const AppFormTitle = ({ title = "Form Title" }: AppFormTitleProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <AppLogo shadow={true} />
      <Typography
        variant="h4"
        color="primary"
        sx={{ mt: 3, fontWeight: "bold" }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default AppFormTitle;
