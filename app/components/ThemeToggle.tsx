"use client";

import React from "react";
import { IconButton, Box, useTheme, styled } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeMode } from "@/lib/theme/ThemeContext";

const StyledToggleButton = styled(IconButton)(({ theme }) => ({
  width: 35,
  height: 35,
  padding: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800],
  border: `2px solid ${
    theme.palette.mode === "light"
      ? theme.palette.grey[300]
      : theme.palette.grey[700]
  }`,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor:
      theme.palette.mode === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
    transform: "scale(1.05)",
    boxShadow:
      theme.palette.mode === "light"
        ? "0 4px 12px rgba(0,0,0,0.15)"
        : "0 4px 12px rgba(0,0,0,0.5)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  position: "relative",
  "& svg": {
    fontSize: 22,
    transition: "all 0.1s cubic-bezier(0.4, 0, 0.2, 1)",
    color:
      theme.palette.mode === "light"
        ? theme.palette.grey[700]
        : theme.palette.grey[100],
  },
}));

const AnimatedIcon = styled(Box)<{ isVisible: boolean }>(({ isVisible }) => ({
  position: "absolute",
  opacity: isVisible ? 1 : 0,
  transform: isVisible ? "rotate(0deg) scale(1)" : "rotate(180deg) scale(0.5)",
  transition: "all 0.1s cubic-bezier(0.4, 0, 0.2, 1)",
  marginTop: ".25rem",
}));

export default function ThemeToggle() {
  const { mode, toggleColorMode } = useThemeMode();
  const theme = useTheme();

  return (
    <StyledToggleButton
      onClick={toggleColorMode}
      aria-label="toggle theme"
      size="small"
    >
      <IconWrapper>
        <AnimatedIcon isVisible={mode === "light"}>
          <LightModeIcon />
        </AnimatedIcon>
        <AnimatedIcon isVisible={mode === "dark"}>
          <DarkModeIcon />
        </AnimatedIcon>
      </IconWrapper>
    </StyledToggleButton>
  );
}
