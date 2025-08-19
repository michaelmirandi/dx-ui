"use client";

import { Box, Typography, useTheme, Avatar } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useData } from "@/lib/data/DataProvider";
import Person2Icon from "@mui/icons-material/Person2";
import DxvPercentile from "./DxvPercentile";

const columns: GridColDef[] = [
  {
    field: "player",
    headerName: "Player",
    flex: 1.75,
    minWidth: 180,
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
              #{player.jersey_number} • {player.class} • {player.position} •{" "}
              {player.height} • {player.weight}lbs
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    field: "dxv_rating",
    headerName: "DXV",
    width: 50,
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridRenderCellParams) => {
      const dxvRating = parseFloat(params.value) || 0;
      // Convert DXV rating to percentile (assuming DXV ranges from 0-100)
      // You may need to adjust this based on your actual DXV scale
      const percentile = dxvRating / 100;

      return <DxvPercentile percentile={percentile} />;
    },
  },
  {
    field: "minutes",
    headerName: "MIN",
    width: 50,
    align: "center",
    headerAlign: "center",
    valueFormatter: (value: number) => (value ? value.toFixed(1) : "0.0"),
  },
  {
    field: "points",
    headerName: "PTS",
    width: 50,
    align: "center",
    headerAlign: "center",
    valueFormatter: (value: number) => (value ? value.toFixed(1) : "0.0"),
  },
  {
    field: "rebounds",
    headerName: "REB",
    width: 50,
    align: "center",
    headerAlign: "center",
    valueFormatter: (value: number) => (value ? value.toFixed(1) : "0.0"),
  },
  {
    field: "assists",
    headerName: "AST",
    width: 50,
    align: "center",
    headerAlign: "center",
    valueFormatter: (value: number) => (value ? value.toFixed(1) : "0.0"),
  },
];

export default function TeamRoster() {
  const theme = useTheme();
  const { team, loading, error } = useData();

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
          Loading roster...
        </Typography>
      </Box>
    );
  }

  if (error || !team) {
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
          Unable to load roster
        </Typography>
      </Box>
    );
  }

  // Transform team data for DataGrid
  const gridRows = team.roster.map((player, index) => {
    // Find matching stats for this player
    const playerStats = team.stats.find(
      (stat) => stat.player_id === player.player_id
    );

    return {
      id: player.player_id || index,
      jersey_number: player.jersey_number,
      name: player.name,
      position: player.position,
      height: player.height,
      weight: player.weight,
      class: player.class,
      dxv_rating: player.dxv_rating,
      minutes: playerStats?.stats?.minutes || 0,
      points: playerStats?.stats?.points || 0,
      rebounds: playerStats?.stats?.rebounds || 0,
      assists: playerStats?.stats?.assists || 0,
    };
  });

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2,
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
        {team.name} Roster ({team.roster.length})
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
          "& .MuiDataGrid-cell[data-field='dxv_rating']": {
            padding: 0,
          },
          "& .MuiDataGrid-columnHeader[data-field='dxv_rating']": {
            padding: 0,
          },
        }}
      />
    </Box>
  );
}
