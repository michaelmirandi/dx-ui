"use client";

import React from "react";
import { Card, CardContent, useTheme } from "@mui/material";

interface GradientCardProps {
  children: React.ReactNode;
  gradientType?: "primary" | "secondary" | "warning" | "info";
}

export default function GradientCard({
  children,
  gradientType = "primary",
}: GradientCardProps) {
  const theme = useTheme();

  const getGradientColors = () => {
    switch (gradientType) {
      case "primary":
        return {
          start: "rgba(84, 38, 26, 0.3)",
          startLight: "rgba(84, 38, 26, 0.2)",
          end: "rgba(253, 183, 38, 0.3)",
          endLight: "rgba(253, 183, 38, 0.2)",
          borderStart: theme.palette.primary.main,
          borderEnd: theme.palette.secondary.main,
        };
      case "secondary":
        return {
          start: "rgba(253, 183, 38, 0.3)",
          startLight: "rgba(253, 183, 38, 0.2)",
          end: "rgba(84, 38, 26, 0.3)",
          endLight: "rgba(84, 38, 26, 0.2)",
          borderStart: theme.palette.secondary.main,
          borderEnd: theme.palette.primary.main,
        };
      case "warning":
        return {
          start: "rgba(255, 152, 0, 0.3)",
          startLight: "rgba(255, 152, 0, 0.2)",
          end: "rgba(253, 183, 38, 0.3)",
          endLight: "rgba(253, 183, 38, 0.2)",
          borderStart: theme.palette.warning.main,
          borderEnd: theme.palette.secondary.main,
        };
      case "info":
        return {
          start: "rgba(33, 150, 243, 0.3)",
          startLight: "rgba(33, 150, 243, 0.2)",
          end: "rgba(84, 38, 26, 0.3)",
          endLight: "rgba(84, 38, 26, 0.2)",
          borderStart: theme.palette.info.main,
          borderEnd: theme.palette.primary.main,
        };
      default:
        return {
          start: "rgba(84, 38, 26, 0.3)",
          startLight: "rgba(84, 38, 26, 0.2)",
          end: "rgba(253, 183, 38, 0.3)",
          endLight: "rgba(253, 183, 38, 0.2)",
          borderStart: theme.palette.primary.main,
          borderEnd: theme.palette.secondary.main,
        };
    }
  };

  const colors = getGradientColors();

  return (
    <Card
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        background: "transparent",
        boxShadow: "none",
      }}
    >
      <CardContent
        sx={{
          flex: 1,
          p: 1.25,
          "&:last-child": { pb: 1.25 },
          background:
            theme.palette.mode === "dark"
              ? `linear-gradient(135deg, 
                ${colors.start} 0%, 
                ${colors.start.replace("0.3", "0.1")} 20%, 
                ${theme.palette.background.paper} 40%, 
                ${theme.palette.background.paper} 60%, 
                ${colors.end.replace("0.3", "0.1")} 80%, 
                ${colors.end} 100%)`
              : `linear-gradient(135deg, 
                ${colors.startLight} 0%, 
                ${colors.startLight.replace("0.2", "0.05")} 20%, 
                ${theme.palette.background.paper} 40%, 
                ${theme.palette.background.paper} 60%, 
                ${colors.endLight.replace("0.2", "0.05")} 80%, 
                ${colors.endLight} 100%)`,
          border: "2px solid transparent",
          borderRadius: "12px",
          backgroundClip: "padding-box, border-box",
          backgroundOrigin: "padding-box, border-box",
          position: "relative",
          "&::before": {
            content: '""',
            position: "absolute",
            top: -2,
            left: -2,
            right: -2,
            bottom: -2,
            background: `linear-gradient(135deg, ${colors.borderStart}, ${colors.borderEnd})`,
            borderRadius: "12px",
            zIndex: -1,
            opacity: 0.5,
          },
        }}
      >
        {children}
      </CardContent>
    </Card>
  );
}
