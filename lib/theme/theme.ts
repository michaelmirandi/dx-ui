import { createTheme, PaletteMode } from '@mui/material';
import { getThemeOptions } from './theme-options';

export const createAppTheme = (mode: PaletteMode) => {
  return createTheme(getThemeOptions(mode));
};