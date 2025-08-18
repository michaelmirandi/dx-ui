"use client";

import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import GradientCard from "./GradientCard";

interface Recruit {
  id: number;
  rank: number;
  name: string;
  position: string;
  height: string;
  weight: number;
  highSchool: string;
  state: string;
  status: string;
}

const mockRecruits: Recruit[] = [
  {
    id: 1,
    rank: 5,
    name: "Jaylen Brown",
    position: "SF",
    height: "6'8\"",
    weight: 215,
    highSchool: "Oak Hill Academy",
    state: "VA",
    status: "Committed",
  },
  {
    id: 2,
    rank: 12,
    name: "Marcus Green",
    position: "PG",
    height: "6'2\"",
    weight: 180,
    highSchool: "IMG Academy",
    state: "FL",
    status: "Signed",
  },
  {
    id: 3,
    rank: 23,
    name: "DeAndre Jackson",
    position: "SG",
    height: "6'5\"",
    weight: 195,
    highSchool: "Montverde Academy",
    state: "FL",
    status: "Committed",
  },
  {
    id: 4,
    rank: 31,
    name: "Chris Johnson",
    position: "C",
    height: "6'11\"",
    weight: 240,
    highSchool: "La Lumiere",
    state: "IN",
    status: "Visiting",
  },
  {
    id: 5,
    rank: 45,
    name: "Jordan Williams",
    position: "PF",
    height: "6'9\"",
    weight: 225,
    highSchool: "Sunrise Christian",
    state: "KS",
    status: "Offered",
  },
];

const columns: GridColDef[] = [
  {
    field: "rank",
    headerName: "Rank",
    width: 60,
    align: "center",
    headerAlign: "center",
    renderCell: ({ value }) => (
      <Typography sx={{ fontWeight: 600 }}>#{value}</Typography>
    ),
  },
  {
    field: "name",
    headerName: "Name",
    flex: 1.5,
    minWidth: 130,
  },
  {
    field: "position",
    headerName: "Pos",
    width: 50,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "highSchool",
    headerName: "High School",
    flex: 1,
    minWidth: 120,
  },
  {
    field: "state",
    headerName: "State",
    width: 50,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "Status",
    width: 90,
    align: "center",
    headerAlign: "center",
    renderCell: ({ value }) => {
      const getColor = () => {
        if (value === "Committed" || value === "Signed") return "success.main";
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

export default function RSCIRankings() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        p: 2,
        pb: 0,
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
        }}
      >
        RSCI Rankings
      </Typography>
      <GradientCard gradientType="primary">
        <DataGrid
          rows={mockRecruits}
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
