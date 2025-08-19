"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  useTheme,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Stack,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useData } from "@/lib/data/DataProvider";
import Person2Icon from "@mui/icons-material/Person2";

type ClassFilter = "2025" | "2026" | "2027";

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
              {player.position} • {player.height} • {player.weight}lb •{" "}
              {player.age}y
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    field: "nationality",
    headerName: "Nationality",
    flex: 1,
    minWidth: 90,
    renderCell: (params: GridRenderCellParams) => {
      const player = params.row;
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            height: "100%",
            fontSize: { xs: "0.6rem", sm: "0.65rem", md: "0.7rem" },
            fontWeight: 500,
          }}
        >
          {player.nationality}
        </Box>
      );
    },
  },
  {
    field: "ncaa_level",
    headerName: "NCAA",
    width: 80,
    align: "center",
    headerAlign: "center",
    flex: 0.95,
    renderCell: ({ value }) => (
      <Chip
        label={value || "N/A"}
        size="small"
        sx={{
          fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" },
          fontWeight: 600,
          minWidth: 35,
        }}
      />
    ),
  },
  // {
  //   field: "english_level",
  //   headerName: "English",
  //   width: 70,
  //   align: "center",
  //   headerAlign: "center",
  //   renderCell: ({ value }) => {
  //     const getColor = () => {
  //       const level = value?.toUpperCase();
  //       if (level === "FLUENT" || level === "NATIVE") return "success";
  //       if (level === "ADVANCED") return "info";
  //       if (level === "INTERMEDIATE") return "warning";
  //       if (level === "BASIC") return "error";
  //       return "default";
  //     };

  //     return (
  //       <Chip
  //         label={value || "N/A"}
  //         size="small"
  //         color={getColor()}
  //         sx={{
  //           fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" },
  //           fontWeight: 500,
  //         }}
  //       />
  //     );
  //   },
  // },
  {
    field: "ncaa_interest",
    headerName: "Interest",
    width: 80,
    align: "center",
    headerAlign: "center",
    flex: 0.8,

    renderCell: ({ value }) => {
      const getColor = () => {
        const interest = value?.toUpperCase();
        if (interest === "HIGH" || interest === "VERY HIGH") return "success";
        if (interest === "MEDIUM") return "warning";
        if (interest === "LOW") return "error";
        return "default";
      };

      return (
        <Chip
          label={value || "N/A"}
          size="small"
          color={getColor()}
          sx={{
            fontSize: { xs: "0.55rem", sm: "0.6rem", md: "0.65rem" },
            fontWeight: 500,
          }}
        />
      );
    },
  },
];

export default function InternationalPlayers() {
  const theme = useTheme();
  const { international, loading, error } = useData();
  const [classFilter, setClassFilter] = useState<ClassFilter>("2025");

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
          Loading international players...
        </Typography>
      </Box>
    );
  }

  if (error || !international) {
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
          Unable to load international players data
        </Typography>
      </Box>
    );
  }

  // Transform international players data for DataGrid
  const allPlayers = international.map((player, index) => ({
    id: player.player_id || index,
    name: player.name,
    nationality: player.nationality,
    class: player.class,
    position: player.position,
    height: player.height,
    weight: player.weight,
    age: player.age,
    high_school: player.high_school,
    hs_state: player.hs_state,
    ncaa_level: player.ncaa_level,
    ncaa_interest: player.ncaa_interest,
    english_level: player.english_level,
    video_clips: player.video_clips,
    url: player.url,
  }));

  // Filter players by class
  const gridRows = allPlayers.filter((player) => player.class === classFilter);

  // Get unique classes for toggle buttons
  const availableClasses = [
    ...new Set(allPlayers.map((player) => player.class)),
  ].sort();

  const handleClassFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: ClassFilter | null
  ) => {
    if (newFilter !== null) {
      setClassFilter(newFilter);
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
          International Players ({gridRows.length})
        </Typography>

        <ToggleButtonGroup
          value={classFilter}
          exclusive
          onChange={handleClassFilterChange}
          size="small"
          sx={{
            "& .MuiToggleButton-root": {
              fontSize: { xs: "0.65rem", sm: "0.7rem" },
              py: { xs: 0.25, sm: 0.05 },
              px: { xs: 0.75, sm: 1 },
              minWidth: { xs: "35px", sm: "40px" },
            },
          }}
        >
          {availableClasses.map((classYear) => (
            <ToggleButton key={classYear} value={classYear}>
              '{classYear.slice(-2)}
            </ToggleButton>
          ))}
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
        }}
      />
    </Box>
  );
}
