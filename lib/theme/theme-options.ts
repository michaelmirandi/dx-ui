import { ThemeOptions, PaletteMode } from "@mui/material";
import themeConfig from "@/app/data/theme-config.json";

export const getThemeOptions = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: themeConfig.primary,
    },
    secondary: {
      main: themeConfig.secondary,
    },
    ...(mode === "light"
      ? {
          background: {
            default: "#fafafa",
            paper: "#ffffff",
          },
          text: {
            primary: "rgba(0, 0, 0, 0.87)",
            secondary: "rgba(0, 0, 0, 0.6)",
          },
        }
      : {
          background: {
            default: "#121212",
            paper: "#1e1e1e",
          },
          text: {
            primary: "rgba(255, 255, 255, 0.87)",
            secondary: "rgba(255, 255, 255, 0.6)",
          },
        }),
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
  },
  typography: {
    fontFamily: [
      "Montserrat",
      '"Nunito Sans"',
      '"Source Sans Pro"',
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 500,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.6,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: "none",
          fontWeight: 500,
          padding: "8px 16px",
          transition: "all 0.2s ease-in-out",
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow:
            mode === "light"
              ? "0 2px 12px rgba(0,0,0,0.08)"
              : "0 2px 12px rgba(0,0,0,0.4)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 6,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    //@ts-ignore
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: "none",
          borderRadius: 2,
          overflow: "hidden",
          position: "relative",
          padding: "8px",
          background:
            mode === "light"
              ? `linear-gradient(135deg, 
                rgba(84, 38, 26, 0.2) 0%, 
                rgba(84, 38, 26, 0.05) 20%, 
                #ffffff 40%, 
                #ffffff 60%, 
                rgba(253, 183, 38, 0.05) 80%, 
                rgba(253, 183, 38, 0.2) 100%)`
              : `linear-gradient(135deg, 
                rgba(84, 38, 26, 0.3) 0%, 
                rgba(84, 38, 26, 0.1) 20%, 
                #1e1e1e 40%, 
                #1e1e1e 60%, 
                rgba(253, 183, 38, 0.1) 80%, 
                rgba(253, 183, 38, 0.3) 100%)`,
          "&::before": {
            content: '""',
            position: "absolute",
            top: -1,
            left: -1,
            right: -1,
            bottom: -1,
            background: "linear-gradient(135deg, #54261A, #FDB726)",
            borderRadius: "9px",
            zIndex: -1,
            opacity: 0.6,
          },
        },
        main: {
          borderRadius: 2,
          border: mode === "light" 
            ? "1px solid rgba(0, 0, 0, 0.12)" 
            : "1px solid rgba(255, 255, 255, 0.12)",
          overflow: "hidden",
        },
        row: {
          transition: "all 0.2s ease-in-out",
          "&:nth-of-type(even)": {
            backgroundColor:
              mode === "light"
                ? "#f8f9fa"
                : "#2d2d2d",
            boxShadow: 
              mode === "light"
                ? "inset 0 1px 0 rgba(255, 255, 255, 0.8)"
                : "inset 0 1px 0 rgba(255, 255, 255, 0.1)",
          },
          "&:nth-of-type(odd)": {
            backgroundColor:
              mode === "light"
                ? "#ffffff"
                : "#1a1a1a",
            boxShadow: 
              mode === "light"
                ? "inset 0 1px 0 rgba(255, 255, 255, 0.4)"
                : "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
          },
          "&:hover": {
            backgroundColor:
              mode === "light"
                ? "#e9ecef"
                : "#404040",
            boxShadow: 
              mode === "light"
                ? "inset 0 1px 0 rgba(255, 255, 255, 1), 0 2px 8px rgba(0, 0, 0, 0.15)"
                : "inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 2px 8px rgba(0, 0, 0, 0.5)",
            transform: "translateY(-1px)",
          },
        },
      },
    },
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
});
