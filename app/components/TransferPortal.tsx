"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Box,
  Typography,
  Chip,
  useTheme,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
  Tooltip,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useData } from "@/lib/data/DataProvider";
import Person2Icon from "@mui/icons-material/Person2";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ShieldIcon from "@mui/icons-material/Shield";
import DxvPercentile from "./DxvPercentile";

type PlayerView = "available" | "committed";

const columns: GridColDef[] = [
  {
    field: "player",
    headerName: "Player",
    flex: 1.75,
    minWidth: 150,
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
              {player.class} • {player.position} • {player.height} •{" "}
              {player.weight}lbs
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    field: "current_team",
    headerName: "Team",
    width: 50,
    align: "center",
    headerAlign: "center",
    flex: 0.5,
    renderCell: (params: GridRenderCellParams) => {
      const teamId = params.row.team_id;
      const teamName = params.row.current_team;

      if (!teamId) {
        return (
          <Tooltip title={teamName} placement="right">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{ width: "100%", height: "100%" }}
            >
              <ShieldIcon sx={{ fontSize: 30, flexShrink: 0 }} />
            </Box>
          </Tooltip>
        );
      }

      return (
        <Tooltip title={teamName} placement="right">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              width: "100%",
              height: "100%",
              position: "relative",
              py: 2,
            }}
          >
            <Image
              src={`https://www.draftexpress.com/blue/graphics/logos/teams/${teamId}.png`}
              alt={teamName}
              width={25}
              height={25}
              style={{ objectFit: "contain" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement
                  ?.querySelector(".fallback-icon")
                  ?.classList.remove("hidden");
              }}
            />
            <ShieldIcon
              className="fallback-icon hidden"
              sx={{
                fontSize: 30,
                flexShrink: 0,
                display: "none",
                "&.hidden": { display: "none" },
                "&:not(.hidden)": { display: "block" },
              }}
            />
          </Box>
        </Tooltip>
      );
    },
  },
  {
    field: "dxv_rating",
    headerName: "DXV",
    width: 50,
    align: "center",
    headerAlign: "center",
    flex: 0.5,
    renderCell: (params: GridRenderCellParams) => {
      const dxvRating = parseFloat(params.value) || 0;
      // Convert DXV rating to percentile (assuming DXV ranges from 0-100)
      // You may need to adjust this based on your actual DXV scale
      const percentile = dxvRating / 100;

      return <DxvPercentile percentile={percentile} />;
    },
  },
  {
    field: "transfer_status",
    headerName: "Status",
    width: 100,
    flex: 1.25,
    align: "center",
    headerAlign: "center",
    renderCell: ({ value }) => {
      const statusLower = value?.toLowerCase() || "";

      const getStatusColor = () => {
        if (
          statusLower.includes("committed") ||
          statusLower.includes("signed")
        ) {
          return "success";
        } else if (statusLower.includes("initiated")) {
          return "warning";
        } else if (statusLower.includes("withdrawn")) {
          return "error";
        } else if (statusLower.includes("waiver")) {
          return "info";
        }
        return "default";
      };

      const getStatusLabel = () => {
        if (
          statusLower.includes("committed") ||
          statusLower.includes("signed")
        ) {
          return "Committed";
        } else if (statusLower.includes("initiated")) {
          return "Initiated";
        } else if (statusLower.includes("withdrawn")) {
          return "Withdrawn";
        } else if (statusLower.includes("waiver")) {
          return "Needs Waivers";
        }
        return value || "Available";
      };

      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Chip
            label={getStatusLabel()}
            size="small"
            color={getStatusColor()}
            sx={{
              fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" },
              fontWeight: 600,
            }}
          />
          {statusLower.includes("committed") && (
            <ShieldIcon
              className="fallback-icon hidden"
              sx={{
                fontSize: 30,
                flexShrink: 0,
                ml: 1,
              }}
            />
          )}
        </Box>
      );
    },
  },
];

export default function TransferPortal() {
  const theme = useTheme();
  const { transferPortal, loading, error } = useData();
  const [view, setView] = useState<PlayerView>("available");

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
          Loading transfer portal...
        </Typography>
      </Box>
    );
  }

  if (error || !transferPortal) {
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
          Unable to load transfer portal data
        </Typography>
      </Box>
    );
  }

  // Transform transfer portal data for DataGrid
  const transformPlayers = (players: any[], isCommitted: boolean) => {
    return players.map((player, index) => ({
      id: player.player_id || `${isCommitted ? "c" : "a"}-${index}`,
      name: player.name,
      current_team: player.current_team || player.team || "N/A",
      team_id: player.team_id,
      position: player.position,
      height: player.height,
      weight: player.weight,
      class: player.class,
      dxv_rating: player.dxv_rating,
      transfer_status:
        player.transfer_status || (isCommitted ? "Committed" : "Available"),
      minutes: player.stats?.minutes || 0,
      points: player.stats?.points || 0,
      rebounds: player.stats?.rebounds || 0,
      assists: player.stats?.assists || 0,
      url: player.url,
    }));
  };

  const availablePlayers = transformPlayers(transferPortal.available, false);
  const committedPlayers = transformPlayers(transferPortal.committed, true);

  // Sort by DXV rating (descending)
  const sortByDXV = (a: any, b: any) => {
    const aDXV = parseFloat(a.dxv_rating) || 0;
    const bDXV = parseFloat(b.dxv_rating) || 0;
    return bDXV - aDXV;
  };

  const gridRows =
    view === "available"
      ? availablePlayers.sort(sortByDXV)
      : committedPlayers.sort(sortByDXV);

  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: PlayerView | null
  ) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 1,
        overflow: "hidden",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent={{ xs: "flex-start", sm: "space-between" }}
        spacing={{ xs: 1, sm: 0 }}
        sx={{
          mb: 2,
          pb: 1,
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main}4D 100%)`,
          backgroundSize: "100% 1px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
          flexShrink: 0,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
          }}
        >
          Transfer Portal ({gridRows.length})
        </Typography>

        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          size="small"
          sx={{
            "& .MuiToggleButton-root": {
              fontSize: { xs: "0.65rem", sm: "0.7rem" },
              py: { xs: 0.25, sm: 0.05 },
              px: { xs: 1, sm: 1.5 },
            },
          }}
        >
          <ToggleButton value="available">
            <SwapHorizIcon sx={{ fontSize: { xs: 11, sm: 12 }, mr: 0.5 }} />
            Available ({availablePlayers.length})
          </ToggleButton>
          <ToggleButton value="committed">
            <CheckCircleIcon sx={{ fontSize: { xs: 11, sm: 12 }, mr: 0.5 }} />
            Committed ({committedPlayers.length})
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

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
          // Apply zero padding only to DXV column
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
