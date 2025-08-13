import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import ThemeRegistry from "@/lib/theme/ThemeRegistry";
import AppHeader from "@/components/AppHeader";
import BackgroundGradient from "@/components/BackgroundGradient";
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
          <BackgroundGradient />
          <Box sx={{ minHeight: "100vh", position: "relative" }}>
            <AppHeader />
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              {children}
            </Container>
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
