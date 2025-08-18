"use client";

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useData } from "@/lib/data/DataProvider";
import { parseOpponent, parseGameDate } from "@/lib/utils/gameUtils";

import { GameResult } from "@/lib/types/data";

const RecentGameCard: React.FC<{ game: GameResult }> = ({ game }) => {
  const theme = useTheme();
  const { name: cleanOpponent, isHome } = parseOpponent(game.opponent);
  const gameDate = parseGameDate(game.date);

  // Parse result for win/loss and score
  const isWin = game.result_or_time?.includes("W");
  const isLoss = game.result_or_time?.includes("L");
  const score = game.result_or_time?.replace(/^[WL]\s*/, "") || "";

  return (
    <Box
      sx={{
        minWidth: 120,
        maxWidth: 160,
        height: 32,
        display: "flex",
        alignItems: "center",
        background: isWin
          ? `linear-gradient(135deg, ${theme.palette.success.dark}15, ${theme.palette.success.light}25)`
          : isLoss
          ? `linear-gradient(135deg, ${theme.palette.error.dark}15, ${theme.palette.error.light}25)`
          : `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.action.hover}50)`,
        border: `1px solid ${
          isWin
            ? theme.palette.success.light
            : isLoss
            ? theme.palette.error.light
            : theme.palette.divider
        }`,
        borderRadius: 0.5,
        px: 0.7,
        my: 1,
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow: `0 4px 12px ${theme.palette.action.selected}40`,
          background: isWin
            ? `linear-gradient(135deg, ${theme.palette.success.dark}25, ${theme.palette.success.light}35)`
            : isLoss
            ? `linear-gradient(135deg, ${theme.palette.error.dark}25, ${theme.palette.error.light}35)`
            : `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.action.hover}70)`,
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: isWin
            ? `linear-gradient(90deg, ${theme.palette.success.main}, ${theme.palette.success.light})`
            : isLoss
            ? `linear-gradient(90deg, ${theme.palette.error.main}, ${theme.palette.error.light})`
            : "transparent",
        },
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="caption"
            sx={{
              fontWeight: 700,
              color: theme.palette.text.primary,
              fontSize: "0.65rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              letterSpacing: "0.02em",
              mb: -0.4,
              mt: 1.25,
              display: "block",
            }}
          >
            {isHome ? "vs" : "@"} {cleanOpponent}
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="caption"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: "0.55rem",
                fontWeight: 500,
                opacity: 0.8,
                pb: 1,
              }}
            >
              {gameDate.getMonth() + 1}/{gameDate.getDate()}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: isWin
                  ? theme.palette.success.dark
                  : isLoss
                  ? theme.palette.error.dark
                  : theme.palette.text.secondary,
                fontSize: "0.6rem",
                fontWeight: 800,
                letterSpacing: "0.5px",
                fontFamily: "monospace",
                pb: 1,
              }}
            >
              {score}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const UpcomingGamesBanner: React.FC = () => {
  const theme = useTheme();
  const { team, loading, error } = useData();

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          height: 48,
          bgcolor: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.divider}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          Loading games...
        </Typography>
      </Box>
    );
  }

  if (error || !team) {
    return (
      <Box
        sx={{
          width: "100%",
          height: 48,
          bgcolor: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.divider}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" color="error">
          Unable to load games
        </Typography>
      </Box>
    );
  }

  const recentGames = team.schedule.slice(-12).reverse();

  if (recentGames.length === 0) {
    return (
      <Box
        sx={{
          width: "100%",
          height: 48,
          bgcolor: theme.palette.background.default,
          borderBottom: `1px solid ${theme.palette.divider}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" color="text.secondary">
          No recent games
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: 48,
        bgcolor: theme.palette.background.default,
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box sx={{ px: 0.5, width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            overflowX: "auto",
            "&::-webkit-scrollbar": {
              height: 3,
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.action.selected,
              borderRadius: 1.5,
              "&:hover": {
                backgroundColor: theme.palette.action.focus,
              },
            },
          }}
        >
          {recentGames.map((game, index) => (
            <RecentGameCard key={`${game.game_number}-${index}`} game={game} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UpcomingGamesBanner;
