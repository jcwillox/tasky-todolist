import React, {
  createContext,
  FunctionComponent,
  useContext,
  useMemo
} from "react";
import { PaletteMode, ThemeProvider } from "@mui/material";
import { getTheme } from "../config/theme";
import { useLocalStorageState } from "use-local-storage-state";

const ThemeModeContext = createContext({
  toggleThemeMode: () => {}
});

export const useThemeModeToggle = () => useContext(ThemeModeContext);

const ThemeModeProvider: FunctionComponent = ({ children }) => {
  const [mode, setMode] = useLocalStorageState<PaletteMode>("theme", "light");

  const themeMode = useMemo(
    () => ({
      toggleThemeMode: () => {
        setMode(prevMode => (prevMode === "light" ? "dark" : "light"));
      }
    }),
    [setMode]
  );

  const theme = useMemo(() => getTheme(mode!), [mode]);

  return (
    <ThemeModeContext.Provider value={themeMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  );
};

export default ThemeModeProvider;
