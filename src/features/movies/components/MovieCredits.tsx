import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../shared/hooks/useTheme";
import { theme, type ThemeColors } from "../../../shared/styles";
import { available } from "../../../shared/utils/available";
import type { MovieDetails } from "../types/movies";

type MovieCreditsProps = {
  movie: Pick<MovieDetails, "Director" | "Actors">;
};

export default function MovieCredits({ movie }: MovieCreditsProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  if (!available(movie.Director) && !available(movie.Actors)) {
    return null;
  }
  

  return (
    <View style={styles.credits}>
      {available(movie.Director) && (
        <View style={styles.credit}>
          <Text style={styles.label}>DIRECTOR</Text>
          <Text style={styles.creditValue}>{movie.Director}</Text>
        </View>
      )}
      {available(movie.Actors) && (
        <View style={styles.credit}>
          <Text style={styles.label}>STARRING</Text>
          <Text style={styles.creditValue}>{movie.Actors}</Text>
        </View>
      )}
    </View>
  );
}

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    credits: {
      backgroundColor: colors.container.surface,
      borderRadius: theme.radius.lg,
      padding: theme.spacing.lg,
      gap: theme.spacing.lg,
    },
    credit: { gap: theme.spacing.xs },
    label: {
      color: colors.text.secondary,
      fontSize: theme.fontSize.xs,
      fontWeight: theme.fontWeight.semiBold,
      letterSpacing: 1,
    },
    creditValue: {
      color: colors.text.primary,
      fontSize: theme.fontSize.sm,
      lineHeight: 22,
    },
  });
