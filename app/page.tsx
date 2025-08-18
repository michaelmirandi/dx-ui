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
        height: "100%",
        display: "flex",
        flexDirection: "column",
        bgcolor: theme.palette.background.default,
      }}
    >
      <UpcomingGamesBanner />
      
      <Box sx={{ flex: 1, overflow: "hidden" }}>
        <Grid
        container
        spacing={0}
        sx={{
          height: "100%",
          width: "100%",
          margin: 0,
        }}
      >
        {/* Column 1: Roster Listing */}
        <Grid
          size={{ xs: 12, md: 6, lg: 4 }}
          sx={{
            height: { xs: "auto", md: "50%", lg: "100%" },
            overflow: "auto",
          }}
        >
          <TeamRoster />
        </Grid>

        {/* Column 2: Transfer Portal */}
        <Grid
          size={{ xs: 12, md: 6, lg: 4 }}
          sx={{
            height: { xs: "auto", md: "50%", lg: "100%" },
            overflow: "auto",
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
              flex: 1,
              overflow: "auto",
            }}
          >
            <RSCIRankings />
          </Box>

          {/* International Players - Bottom Section */}
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
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
