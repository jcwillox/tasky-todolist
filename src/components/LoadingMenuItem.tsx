import React, { MouseEvent, ReactNode, useState } from "react";
import {
  CircularProgress,
  ListItemIcon,
  MenuItem,
  MenuItemProps
} from "@mui/material";

type AsyncOnClick = (event: MouseEvent<HTMLLIElement>) => Promise<void>;

interface LoadingMenuItemProps extends MenuItemProps {
  onClick?: AsyncOnClick;
  icon?: ReactNode;
}

const LoadingMenuItem = ({
  onClick,
  icon,
  children,
  ...props
}: LoadingMenuItemProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleClick: AsyncOnClick = async event => {
    if (!onClick) return;
    setIsSubmitting(true);
    await onClick(event);
    setIsSubmitting(false);
  };
  return (
    <MenuItem onClick={handleClick} {...props}>
      <ListItemIcon>
        {isSubmitting ? <CircularProgress size={18} /> : icon}
      </ListItemIcon>
      {children}
    </MenuItem>
  );
};

export default LoadingMenuItem;
