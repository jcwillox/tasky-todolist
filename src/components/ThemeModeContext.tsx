import React, {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
  useMemo
} from "react";
import { PaletteMode, ThemeProvider, useMediaQuery } from "@mui/material";
import { getTheme } from "../config/theme";
import { useLocalStorageState } from "use-local-storage-state";

const useThemeModeProvider = () => {
  const [themeMode, setMode] = useLocalStorageState<PaletteMode | "system">(
    "theme",
    "light"
  );

  const switchThemeMode = useCallback(() => {
    setMode(prevMode => {
      switch (prevMode) {
        case "light":
          return "dark";
        case "dark":
          return "system";
        case "system":
          return "light";
      }
    });
  }, [setMode]);

  return { themeMode, switchThemeMode };
};

export const useThemeMode = () => useContext(ThemeModeContext);

const ThemeModeContext = createContext(
  {} as ReturnType<typeof useThemeModeProvider>
);

const ThemeModeProvider: FunctionComponent = ({ children }) => {
  const { themeMode, switchThemeMode } = useThemeModeProvider();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      themeMode === "system"
        ? getTheme(prefersDarkMode ? "dark" : "light")
        : getTheme(themeMode),
    [themeMode, prefersDarkMode]
  );

  return (
    <ThemeModeContext.Provider value={{ themeMode, switchThemeMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeProvider;
