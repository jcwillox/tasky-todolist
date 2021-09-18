import React, {
  createContext,
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { PaletteMode, ThemeProvider } from "@mui/material";
import { getTheme } from "../config/theme";

const ThemeModeContext = createContext({
  toggleThemeMode: () => {}
});

export const useThemeModeToggle = () => useContext(ThemeModeContext);

const ThemeModeProvider: FunctionComponent = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>(
    (localStorage.getItem("theme") || "light") as PaletteMode
  );

  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
      }
    }),
    []
  );

  useEffect(() => localStorage.setItem("theme", mode), [mode]);

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeProvider;
