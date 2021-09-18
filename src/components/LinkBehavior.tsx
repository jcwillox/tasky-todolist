import React from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from "react-router-dom";

/** Component to patch Material UI's use of links to use React Routers links */
const LinkBehavior = React.forwardRef<
  any,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>(({ href, ...other }, ref) => {
  return <RouterLink ref={ref} to={href} {...other} />;
});

export default LinkBehavior;
