import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import ThemeRegistry from "@/lib/theme/ThemeRegistry";
import DataProvider from "@/lib/data/DataProvider";
import AppHeader from "@/app/components/AppHeader";
import BackgroundGradient from "@/app/components/BackgroundGradient";
import { Toolbar, Container, Box } from "@mui/material";
import "./globals.css";

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DX Demo UI",
  description: "Dynamic theme Next.js app with Material-UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={montserrat.className}>
        <ThemeRegistry>
          <DataProvider>
            <BackgroundGradient />
            <Box
              sx={{ 
                display: "flex", 
                flexDirection: "column", 
                height: "100vh",
                overflow: { xs: "auto", lg: "hidden" },
              }}
            >
              <AppHeader />
              <Box sx={{ 
                flex: 1, 
                overflow: { xs: "visible", lg: "hidden" }, 
                position: "relative",
                minHeight: 0,
              }}>
                {children}
              </Box>
            </Box>
          </DataProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
