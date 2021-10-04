import React from "react";
import { ReactComponent as LogoIcon } from "../assets/logo.svg";

type AppLogoProps = {
  shadow?: boolean;
  width?: number;
};

const AppLogo = ({ shadow = false, width = 100 }: AppLogoProps) => {
  const dropShadow =
    "drop-shadow(0px 8px 10px rgba(0, 0, 0, 0.14)) drop-shadow(0px 3px 14px rgba(0, 0, 0, 0.12)) drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.2))";

  return (
    <LogoIcon
      style={{
        width: width,
        filter: shadow ? dropShadow : "none"
      }}
    />
  );
};

export default AppLogo;
