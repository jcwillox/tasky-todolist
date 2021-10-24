import React from "react";
import { ReactComponent as LogoIcon } from "../assets/logo.svg";
import { SvgIcon, SvgIconProps } from "@mui/material";

interface AppLogoProps extends SvgIconProps {
  shadow?: boolean;
  width?: number;
}

const dropShadow =
  "drop-shadow(0px 8px 10px rgba(0, 0, 0, 0.14)) drop-shadow(0px 3px 14px rgba(0, 0, 0, 0.12)) drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.2))";

const AppLogo = ({ shadow, width = 100, ...props }: AppLogoProps) => {
  return (
    <SvgIcon
      component={LogoIcon}
      viewBox="0 0 843 945"
      {...props}
      sx={{
        height: "auto",
        width: width,
        filter: shadow ? dropShadow : "none",
        ...props.sx
      }}
    />
  );
};

export default AppLogo;
