import React from "react";
import { Box, Typography } from "@mui/material";
import AppLogo from "./AppLogo";

/**
 * A component for form title with logo
 *
 */

type AppFormTitleProps = {
  shadow?: boolean;
  title: string;
};

const AppFormTitle = ({ shadow = true, title }: AppFormTitleProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <AppLogo shadow={shadow} />
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
