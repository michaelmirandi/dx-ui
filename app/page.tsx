"use client";

import React from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Stack,
  Chip,
  useTheme,
  alpha,
} from "@mui/material";
import {
  Palette as PaletteIcon,
  AutoAwesome as AutoAwesomeIcon,
  Speed as SpeedIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

export default function Home() {
  const theme = useTheme();

  const features = [
    {
      icon: <PaletteIcon />,
      title: "Dynamic Theming",
      description:
        "Easily customizable primary and secondary colors via JSON configuration",
      color: theme.palette.primary.main,
    },
    {
      icon:
        theme.palette.mode === "dark" ? <DarkModeIcon /> : <LightModeIcon />,
      title: "Dark/Light Mode",
      description: "Seamless theme switching with persistent user preferences",
      color: theme.palette.secondary.main,
    },
    {
      icon: <AutoAwesomeIcon />,
      title: "MUI Components",
      description:
        "Full Material-UI component library with custom theme integration",
      color: theme.palette.info.main,
    },
    {
      icon: <SpeedIcon />,
      title: "Next.js Optimized",
      description:
        "Server-side rendering support with proper hydration handling",
      color: theme.palette.success.main,
    },
  ];

  return (
    <Box>
      <Paper
        elevation={0}
        sx={{
          p: 6,
          mb: 4,
          background: `linear-gradient(135deg, ${alpha(
            theme.palette.primary.main,
            0.1
          )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
          borderRadius: 3,
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
      >
        <Stack spacing={3} alignItems="center" textAlign="center">
          <Typography
            variant="h2"
            fontWeight={700}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Welcome to DX UI
          </Typography>
          <Typography variant="h6" color="text.secondary" maxWidth="md">
            A modern Next.js application with dynamic Material-UI theming
            system. Toggle between light and dark modes using the button in the
            header.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Chip label="Next.js 15" color="primary" variant="outlined" />
            <Chip label="MUI v7" color="secondary" variant="outlined" />
            <Chip label="TypeScript" color="info" variant="outlined" />
          </Stack>
        </Stack>
      </Paper>

      <Grid container spacing={3} mb={4}>
        {features.map((feature, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card
              sx={{
                height: "100%",
                transition: "all 0.3s ease-in-out",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: alpha(feature.color, 0.1),
                    color: feature.color,
                    mb: 2,
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Theme Configuration
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Edit{" "}
          <code
            style={{
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              padding: "2px 6px",
              borderRadius: 4,
              fontFamily: "monospace",
            }}
          >
            app/data/theme-config.json
          </code>{" "}
          to customize your theme colors
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" mt={3}>
          <Button variant="contained" startIcon={<SettingsIcon />} size="large">
            View Theme Config
          </Button>
          <Button variant="outlined" size="large">
            Documentation
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
