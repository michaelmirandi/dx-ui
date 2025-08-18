"use client";

import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import GradientCard from "./GradientCard";

interface Player {
  id: number;
  name: string;
  position: string;
  height: string;
  weight: number;
  year: string;
  hometown: string;
  highSchool: string;
}

const mockPlayers: Player[] = [
  {
    id: 1,
    name: "John Smith",
    position: "PG",
    height: "6'2\"",
    weight: 185,
    year: "Junior",
    hometown: "Charlotte, NC",
    highSchool: "Myers Park HS",
  },
  {
    id: 2,
    name: "Mike Johnson",
    position: "SG",
    height: "6'5\"",
    weight: 195,
    year: "Senior",
    hometown: "Raleigh, NC",
    highSchool: "Millbrook HS",
  },
  {
    id: 3,
    name: "David Williams",
    position: "SF",
    height: "6'7\"",
    weight: 210,
    year: "Sophomore",
    hometown: "Durham, NC",
    highSchool: "Durham Academy",
  },
  {
    id: 4,
    name: "James Brown",
    position: "PF",
    height: "6'9\"",
    weight: 225,
    year: "Freshman",
    hometown: "Greensboro, NC",
    highSchool: "Grimsley HS",
  },
  {
    id: 5,
    name: "Robert Davis",
    position: "C",
    height: "6'11\"",
    weight: 245,
    year: "Junior",
    hometown: "Winston-Salem, NC",
    highSchool: "Mount Tabor HS",
  },
  {
    id: 6,
    name: "Marcus Wilson",
    position: "PG",
    height: "6'0\"",
    weight: 175,
    year: "Sophomore",
    hometown: "Asheville, NC",
    highSchool: "Christ School",
  },
  {
    id: 7,
    name: "Anthony Miller",
    position: "SG",
    height: "6'4\"",
    weight: 190,
    year: "Freshman",
    hometown: "Wilmington, NC",
    highSchool: "New Hanover HS",
  },
  {
    id: 8,
    name: "Chris Taylor",
    position: "SF",
    height: "6'6\"",
    weight: 205,
    year: "Senior",
    hometown: "Fayetteville, NC",
    highSchool: "Terry Sanford HS",
  },
];

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    flex: 1.5,
    minWidth: 150,
  },
  {
    field: "position",
    headerName: "Pos",
    width: 60,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "height",
    headerName: "Height",
    width: 70,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "weight",
    headerName: "Weight",
    width: 70,
    align: "center",
    headerAlign: "center",
    valueFormatter: (value: number) => `${value}`,
  },
  {
    field: "year",
    headerName: "Year",
    width: 90,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "hometown",
    headerName: "Hometown",
    flex: 1,
    minWidth: 120,
  },
];

export default function TeamRoster() {
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
        Team Roster
      </Typography>
      <GradientCard gradientType="primary">
        <DataGrid
          rows={mockPlayers}
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
