"use client";

import React from "react";
import Image from "next/image";
import { AppBar, Toolbar, Box, useTheme, alpha } from "@mui/material";
import ThemeToggle from "./ThemeToggle";

export default function AppHeader() {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        backgroundColor:
          theme.palette.mode === "light"
            ? alpha(theme.palette.background.default, 0.5)
            : alpha(theme.palette.background.paper, 0.5),
        borderBottom: `1px solid ${
          theme.palette.mode === "light"
            ? alpha(theme.palette.divider, 0.08)
            : alpha(theme.palette.divider, 0.15)
        }`,
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 48, sm: 60 }, py: 0.5 }}>
        <Box sx={{ display: "flex", alignItems: "center", height: 28 }}>
          <Image
            src="/dx-logo.png"
            alt="DX Logo"
            width={70}
            height={28}
            style={{
              objectFit: "contain",
              filter:
                theme.palette.mode === "dark" ? "brightness(0.9)" : "none",
            }}
            priority
          />
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <ThemeToggle />
      </Toolbar>
    </AppBar>
  );
}
