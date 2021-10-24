import { createTheme, PaletteMode } from "@mui/material";
import LinkBehavior from "../components/LinkBehavior";

export const getTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: {
              main: "#6200EE"
            }
          }
        : {
            // palette values for dark mode
            primary: {
              main: "#985EFF"
            },
            background: {
              default: "#1F1F1F"
            }
          })
    },
    typography: {
      button: {
        textTransform: "none"
      }
    },
    components: {
      MuiLink: {
        defaultProps: {
          // @ts-ignore
          component: LinkBehavior
        }
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehavior
        }
      }
    }
  });
