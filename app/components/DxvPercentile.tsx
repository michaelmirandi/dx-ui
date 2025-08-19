import React from "react";
import { Box, Typography } from "@mui/material";

interface DxvPercentileProps {
  percentile: number;
}

/**
 * Component for displaying DXV rating as a percentile with color gradient
 * @param percentile A number between 0-1 representing the percentile
 */
const DxvPercentile: React.FC<DxvPercentileProps> = ({ percentile }) => {
  // Ensure percentile is between 0 and 1
  const nullPerc = percentile == null;
  const normalizedPercentile = nullPerc
    ? 0.5
    : Math.max(0, Math.min(1, percentile));

  // Calculate color based on percentile
  // Blue (0) -> White (0.5) -> Orange (1)
  // Convert hex colors to RGB
  const blueRGB = { r: 58, g: 141, b: 255 }; // #3A8DFF
  const orangeRGB = { r: 255, g: 145, b: 0 }; // #FF9100
  let backgroundColor: string;

  if (normalizedPercentile < 0.5) {
    // Blue to White gradient (0 to 0.5)
    const factor = normalizedPercentile * 2; // 0 to 1
    const r = Math.round(blueRGB.r + (255 - blueRGB.r) * factor);
    const g = Math.round(blueRGB.g + (255 - blueRGB.g) * factor);
    const b = Math.round(blueRGB.b + (255 - blueRGB.b) * factor);
    backgroundColor = `rgb(${r}, ${g}, ${b})`;
  } else {
    // White to Orange gradient (0.5 to 1)
    const factor = (normalizedPercentile - 0.5) * 2; // 0 to 1
    const r = Math.round(255 - (255 - orangeRGB.r) * factor);
    const g = Math.round(255 - (255 - orangeRGB.g) * factor);
    const b = Math.round(255 - (255 - orangeRGB.b) * factor);
    backgroundColor = `rgb(${r}, ${g}, ${b})`;
  }

  // Display percentile as a percentage
  const percentileDisplay = nullPerc
    ? "-"
    : `${Math.round(normalizedPercentile * 100)}`;

  return (
    <Box
      sx={{
        py: 0.25,
        px: 0.75,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: backgroundColor,
        color: "black",
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: "inherit" }}>
        {percentileDisplay}
      </Typography>
    </Box>
  );
};

export default DxvPercentile;
