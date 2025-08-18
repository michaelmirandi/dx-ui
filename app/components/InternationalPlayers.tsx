"use client";

import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import GradientCard from "./GradientCard";

interface InternationalPlayer {
  id: number;
  name: string;
  country: string;
  position: string;
  height: string;
  age: number;
  previousTeam: string;
  status: string;
}

const mockInternationalPlayers: InternationalPlayer[] = [
  {
    id: 1,
    name: "Luka Petrovic",
    country: "Serbia",
    position: "C",
    height: "7'0\"",
    age: 19,
    previousTeam: "Partizan Belgrade",
    status: "Enrolled",
  },
  {
    id: 2,
    name: "Carlos Rodriguez",
    country: "Spain",
    position: "PG",
    height: "6'1\"",
    age: 20,
    previousTeam: "Real Madrid B",
    status: "Committed",
  },
  {
    id: 3,
    name: "Yuki Tanaka",
    country: "Japan",
    position: "SG",
    height: "6'4\"",
    age: 18,
    previousTeam: "Alvark Tokyo U18",
    status: "Enrolled",
  },
  {
    id: 4,
    name: "Emmanuel Okoro",
    country: "Nigeria",
    position: "PF",
    height: "6'9\"",
    age: 19,
    previousTeam: "NBA Academy Africa",
    status: "Visiting",
  },
  {
    id: 5,
    name: "Alexandre Dubois",
    country: "France",
    position: "SF",
    height: "6'7\"",
    age: 21,
    previousTeam: "ASVEL Lyon",
    status: "Offered",
  },
];

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1.5,
    minWidth: 130,
  },
  {
    field: "country",
    headerName: "Country",
    width: 90,
    renderCell: ({ value }) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <Typography sx={{ fontSize: "1.2rem" }}>
          {value === "Serbia" && "🇷🇸"}
          {value === "Spain" && "🇪🇸"}
          {value === "Japan" && "🇯🇵"}
          {value === "Nigeria" && "🇳🇬"}
          {value === "France" && "🇫🇷"}
        </Typography>
        <Typography sx={{ fontSize: "0.75rem" }}>{value}</Typography>
      </Box>
    ),
  },
  {
    field: "position",
    headerName: "Pos",
    width: 50,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "age",
    headerName: "Age",
    width: 50,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "previousTeam",
    headerName: "Previous Team",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "status",
    headerName: "Status",
    width: 90,
    align: "center",
    headerAlign: "center",
    renderCell: ({ value }) => {
      const getColor = () => {
        if (value === "Enrolled") return "success.main";
        if (value === "Committed") return "primary.main";
        if (value === "Visiting") return "warning.main";
        if (value === "Offered") return "info.main";
        return "text.secondary";
      };
      return (
        <Typography
          sx={{ color: getColor(), fontSize: "0.75rem", fontWeight: 500 }}
        >
          {value}
        </Typography>
      );
    },
  },
];

export default function InternationalPlayers() {
  const theme = useTheme();

  return (
    <Box
      sx={{ height: "100%", display: "flex", flexDirection: "column", p: 2 }}
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
        }}
      >
        International Players
      </Typography>
      <GradientCard gradientType="primary">
        <DataGrid
          rows={mockInternationalPlayers}
          columns={columns}
          rowHeight={30}
          columnHeaderHeight={25}
          disableRowSelectionOnClick
          disableColumnMenu
          hideFooter
          sx={{
            border: "none",
            "& .MuiDataGrid-cell": {
              fontSize: "0.8rem",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "action.hover",
              fontWeight: 600,
              fontSize: "0.8rem",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "action.hover",
            },
          }}
        />
      </GradientCard>
    </Box>
  );
}
