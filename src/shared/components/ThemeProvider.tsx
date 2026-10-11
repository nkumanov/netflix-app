import { createContext, type ReactNode, useMemo } from "react";
import { useColorScheme } from "react-native";
import { darkColors, lightColors } from "../styles";

type ThemeContextValue = {
  colors: typeof lightColors;
  mode: "dark" | "light";
};
export const ThemeContext = createContext<ThemeContextValue | null>(null);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemTheme = useColorScheme();
  const activeTheme = systemTheme === "dark" ? "dark" : "light";

  const colors = activeTheme === "dark" ? darkColors : lightColors;

  const themeState = useMemo<ThemeContextValue>(() => {
    return {
      colors,
      mode: activeTheme,
    };
  }, [colors, activeTheme]);
  return (
    <ThemeContext.Provider value={themeState}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
