import { darkColors, lightColors } from "./colors";
import { radius } from "./radius";
import { spacing } from "./spacing";
import { fontSize, fontWeight } from "./typography";
import type { Theme } from "./types";

export * from "./colors";
export * from "./radius";
export * from "./spacing";
export * from "./typography";
export type * from "./types";

export const darkTheme: Theme = {
  colors: darkColors,
  spacing,
  radius,
  fontSize,
  fontWeight,
};
export const lightTheme: Theme = {
  colors: lightColors,
  spacing,
  radius,
  fontSize,
  fontWeight,
};
export const theme = darkTheme;
