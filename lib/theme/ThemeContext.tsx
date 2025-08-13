"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { PaletteMode } from "@mui/material";

interface ThemeContextType {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeModeProvider");
  }
  return context;
};

interface ThemeModeProviderProps {
  children: React.ReactNode;
}

export const ThemeModeProvider: React.FC<ThemeModeProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<PaletteMode>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedMode = localStorage.getItem("themeMode") as PaletteMode | null;
    if (storedMode && (storedMode === "light" || storedMode === "dark")) {
      setMode(storedMode);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setMode(prefersDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("themeMode", mode);
      document.documentElement.style.colorScheme = mode;
    }
  }, [mode, mounted]);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const value = useMemo(
    () => ({
      mode,
      toggleColorMode,
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
