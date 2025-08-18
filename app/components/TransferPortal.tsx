"use client";

import { Box, Typography, Chip, useTheme } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import GradientCard from "./GradientCard";

interface Transfer {
  id: number;
  name: string;
  previousSchool: string;
  position: string;
  height: string;
  year: string;
  status: "Committed" | "Visiting" | "Contacted" | "Offered";
  rating: number;
}

const mockTransfers: Transfer[] = [
  {
    id: 1,
    name: "Tyler Anderson",
    previousSchool: "Duke",
    position: "PG",
    height: "6'3\"",
    year: "Junior",
    status: "Committed",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Kevin Martinez",
    previousSchool: "UNC",
    position: "SG",
    height: "6'5\"",
    year: "Senior",
    status: "Visiting",
    rating: 4.2,
  },
  {
    id: 3,
    name: "Brandon Lee",
    previousSchool: "Virginia",
    position: "SF",
    height: "6'7\"",
    year: "Sophomore",
    status: "Offered",
    rating: 4.0,
  },
  {
    id: 4,
    name: "Jason White",
    previousSchool: "NC State",
    position: "PF",
    height: "6'9\"",
    year: "Junior",
    status: "Contacted",
    rating: 3.8,
  },
  {
    id: 5,
    name: "Eric Thomas",
    previousSchool: "Wake Forest",
    position: "C",
    height: "7'0\"",
    year: "Senior",
    status: "Visiting",
    rating: 4.3,
  },
  {
    id: 6,
    name: "Michael Harris",
    previousSchool: "Clemson",
    position: "SG",
    height: "6'4\"",
    year: "Sophomore",
    status: "Offered",
    rating: 3.9,
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
    field: "previousSchool",
    headerName: "Previous School",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "position",
    headerName: "Pos",
    width: 50,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "year",
    headerName: "Year",
    width: 80,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "status",
    headerName: "Status",
    width: 110,
    renderCell: ({ value }) => {
      const getColor = () => {
        switch (value) {
          case "Committed":
            return "success";
          case "Visiting":
            return "warning";
          case "Offered":
            return "info";
          case "Contacted":
            return "default";
          default:
            return "default";
        }
      };
      return (
        <Chip
          label={value}
          size="small"
          color={getColor()}
          sx={{ fontSize: "0.75rem" }}
        />
      );
    },
  },
  {
    field: "rating",
    headerName: "Rating",
    width: 70,
    align: "center",
    headerAlign: "center",
    valueFormatter: (value: number) => `${value.toFixed(1)}★`,
  },
];

export default function TransferPortal() {
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
        Transfer Portal
      </Typography>
      <DataGrid
        rows={mockTransfers}
        columns={columns}
        disableRowSelectionOnClick
        hideFooter
        disableColumnMenu
        rowHeight={30}
        columnHeaderHeight={25}
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
    </Box>
  );
}
