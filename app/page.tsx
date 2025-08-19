"use client";

import React from "react";
import { Box, useTheme, Grid } from "@mui/material";
import TeamRoster from "./components/TeamRoster";
import TransferPortal from "./components/TransferPortal";
import RSCIRankings from "./components/RSCIRankings";
import InternationalPlayers from "./components/InternationalPlayers";
import UpcomingGamesBanner from "./components/UpcomingGamesBanner";

export default function Home() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "auto", lg: "100%" },
        minHeight: { xs: "100vh", lg: "100%" },
        display: "flex",
        flexDirection: "column",
        bgcolor: theme.palette.background.default,
      }}
    >
      <UpcomingGamesBanner />
      
      <Box sx={{ 
        flex: 1, 
        overflow: { xs: "auto", lg: "hidden" },
        WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
      }}>
        <Grid
        container
        spacing={0}
        sx={{
          height: { xs: "auto", lg: "100%" },
          width: "100%",
          margin: 0,
        }}
      >
        {/* Column 1: Roster Listing */}
        <Grid
          size={{ xs: 12, md: 6, lg: 4 }}
          sx={{
            height: { xs: "auto", md: "50vh", lg: "100%" },
            minHeight: { xs: "400px", md: "auto" },
            overflow: { xs: "visible", md: "auto" },
          }}
        >
          <TeamRoster />
        </Grid>

        {/* Column 2: Transfer Portal */}
        <Grid
          size={{ xs: 12, md: 6, lg: 4 }}
          sx={{
            height: { xs: "auto", md: "50vh", lg: "100%" },
            minHeight: { xs: "400px", md: "auto" },
            overflow: { xs: "visible", md: "auto" },
          }}
        >
          <TransferPortal />
        </Grid>

        {/* Column 3: RSCI Rankings and International Players */}
        <Grid
          size={{ xs: 12, md: 12, lg: 4 }}
          sx={{
            height: { xs: "auto", lg: "100%" },
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* RSCI Rankings - Top Section */}
          <Box
            sx={{
              flex: { xs: "none", lg: 1 },
              minHeight: { xs: "400px", lg: "auto" },
              overflow: { xs: "visible", lg: "auto" },
            }}
          >
            <RSCIRankings />
          </Box>

          {/* International Players - Bottom Section */}
          <Box
            sx={{
              flex: { xs: "none", lg: 1 },
              minHeight: { xs: "400px", lg: "auto" },
              overflow: { xs: "visible", lg: "auto" },
            }}
          >
            <InternationalPlayers />
          </Box>
        </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
