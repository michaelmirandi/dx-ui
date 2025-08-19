"use client";

import { Box, Typography, useTheme, Chip } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useData } from "@/lib/data/DataProvider";
import Person2Icon from "@mui/icons-material/Person2";
import StarIcon from "@mui/icons-material/Star";

const columns: GridColDef[] = [
  {
    field: "rank",
    headerName: "Rk",
    width: 40,
    align: "center",
    flex: 0.5,
    headerAlign: "center",
    renderCell: ({ value }) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
            color: "text.main",
          }}
        >
          {value}
        </Typography>
      </Box>
    ),
  },
  {
    field: "player",
    headerName: "Player",
    flex: 1.75,
    minWidth: 160,
    renderCell: (params: GridRenderCellParams) => {
      const player = params.row;
      return (
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ width: "100%", overflow: "hidden", ml: -1 }}
        >
          <Person2Icon sx={{ fontSize: 40, flexShrink: 0 }} />
          <Box sx={{ minWidth: 0, flex: 1, width: "100%" }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
                lineHeight: 1.2,
                mt: -0.6,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textDecoration: "underline",
                cursor: player.url ? "pointer" : "default",
              }}
            >
              {player.name}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "text.secondary",
                lineHeight: 1.1,
                fontSize: { xs: "0.5rem", sm: "0.55rem", md: "0.6rem" },
                mt: 0.5,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                display: "block",
                fontWeight: 500,
                width: "100%",
              }}
            >
              {player.position} • {player.height} • {player.weight}lbs •{" "}
              {player.age}yo
            </Typography>
          </Box>
        </Box>
      );
    },
  },

  {
    field: "rsci_rank",
    headerName: "Rating",
    width: 80,
    align: "center",
    flex: 1,
    headerAlign: "center",
    renderCell: ({ value }) => {
      // All RSCI players are 5-star recruits
      const starCount = 5;

      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            gap: 0.1,
          }}
        >
          {Array.from({ length: starCount }).map((_, index) => (
            <StarIcon
              key={index}
              sx={{
                fontSize: { xs: "0.7rem", sm: "0.8rem", md: "0.9rem" },
                color: "warning.main",
              }}
            />
          ))}
        </Box>
      );
    },
  },
];

export default function RSCIRankings() {
  const theme = useTheme();
  const { rsci, loading, error } = useData();

  if (loading) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Loading RSCI rankings...
        </Typography>
      </Box>
    );
  }

  if (error || !rsci) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Typography variant="body2" color="error">
          Unable to load RSCI rankings data
        </Typography>
      </Box>
    );
  }

  // Transform RSCI data for DataGrid
  const gridRows = rsci
    .map((player, index) => ({
      id: player.player_id || index,
      rank: player.rank,
      name: player.name,
      position: player.position,
      height: player.height,
      weight: player.weight,
      age: player.age,
      team: player.team,
      team_id: player.team_id,
      league: player.league,
      rsci_rank: player.rsci_rank,
      url: player.url,
      // Include stats if available
      minutes: player.stats?.minutes || 0,
      points: player.stats?.points || 0,
      rebounds: player.stats?.rebounds || 0,
      assists: player.stats?.assists || 0,
    }))
    .sort((a, b) => a.rank - b.rank); // Sort by rank ascending

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 1,
        pb: 0,
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 2,
          pb: 1,
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main}4D 100%)`,
          backgroundSize: "100% 1px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          flexShrink: 0,
        }}
      >
        RSCI Rankings ({gridRows.length})
      </Typography>

      <DataGrid
        rows={gridRows}
        columns={columns}
        rowHeight={35}
        columnHeaderHeight={25}
        disableRowSelectionOnClick
        disableColumnMenu
        hideFooter
        sx={{
          flex: 1,
          minHeight: 0,
          "& .MuiDataGrid-cell": {
            fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "action.hover",
            fontWeight: 600,
            fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "action.hover",
          },
        }}
      />
    </Box>
  );
}
