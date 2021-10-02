import React, { useEffect, useRef } from "react";
import { styled, Theme } from "@mui/material";
import { SxProps } from "@mui/system/styleFunctionSx";
import jdenticon from "jdenticon/standalone";

type JdenticonProps = {
  value: string;
  size?: number;
  sx?: SxProps<Theme>;
};

const StyledSvg = styled("svg")({});

const Jdenticon = ({ value, size = 24, sx }: JdenticonProps) => {
  const icon = useRef(null);

  useEffect(() => {
    jdenticon.update(icon.current || "", value);
  }, [value]);

  return (
    <StyledSvg
      data-jdenticon-value={value}
      ref={icon}
      sx={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        ...sx
      }}
    />
  );
};

export default Jdenticon;
