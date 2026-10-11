import type { darkColors } from './colors';
import type { fontSize, fontWeight } from './typography';
import type { radius } from './radius';
import type { spacing } from './spacing';

export type ThemeColors = typeof darkColors;
export type Theme = {
  colors: ThemeColors;
  spacing: typeof spacing;
  radius: typeof radius;
  fontSize: typeof fontSize;
  fontWeight: typeof fontWeight;
};
