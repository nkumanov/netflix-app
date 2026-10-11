import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../../shared/hooks/useTheme";
import { theme, type ThemeColors } from "../../../shared/styles";
import { available } from "../../../shared/utils/available";
import type { MovieDetails } from "../types/movies";

type MovieOverviewProps = {
  movie: Pick<
    MovieDetails,
    "Title" | "Poster" | "Year" | "Runtime" | "Rated" | "imdbRating"
  >;
};

export default function MovieOverview({ movie }: MovieOverviewProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [failedPoster, setFailedPoster] = useState<string | null>(null);
  const metadata = [movie.Year, movie.Runtime, movie.Rated].filter(available);

  return (
    <View style={styles.hero}>
      {available(movie.Poster) && failedPoster !== movie.Poster ? (
        <Image
          source={{ uri: movie.Poster }}
          style={styles.poster}
          resizeMode="cover"
          accessibilityLabel={`${movie.Title} poster`}
          onError={() => setFailedPoster(movie.Poster)}
        />
      ) : (
        <View style={[styles.poster, styles.posterFallback]}>
          <Text style={styles.secondary}>Poster unavailable</Text>
        </View>
      )}
      <Text style={styles.eyebrow}>MOVIE SPOTLIGHT</Text>
      <Text style={styles.title}>{movie.Title}</Text>
      <Text style={styles.metadata}>{metadata.join("  ·  ")}</Text>
      {available(movie.imdbRating) && (
        <View style={styles.rating}>
          <Text style={styles.ratingValue}>★ {movie.imdbRating}</Text>
          <Text style={styles.secondary}> / 10 on IMDb</Text>
        </View>
      )}
    </View>
  );
}

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    hero: { alignItems: "center", gap: theme.spacing.md },
    poster: {
      width: "70%",
      maxWidth: 260,
      aspectRatio: 2 / 3,
      borderRadius: theme.radius.lg,
      backgroundColor: colors.card.placeholder,
      borderWidth: 1,
      borderColor: colors.card.border,
    },
    posterFallback: {
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing.lg,
    },
    eyebrow: {
      color: colors.brand.primary,
      fontSize: theme.fontSize.xs,
      fontWeight: theme.fontWeight.bold,
      letterSpacing: 2,
      marginTop: theme.spacing.md,
    },
    title: {
      color: colors.text.primary,
      fontSize: theme.fontSize.xxl,
      fontWeight: theme.fontWeight.bold,
      lineHeight: 38,
      textAlign: "center",
    },
    metadata: {
      color: colors.text.secondary,
      fontSize: theme.fontSize.sm,
      textAlign: "center",
    },
    secondary: {
      color: colors.text.secondary,
      fontSize: theme.fontSize.sm,
      textAlign: "center",
    },
    rating: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.container.surface,
      borderRadius: theme.radius.full,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
    },
    ratingValue: {
      color: colors.text.primary,
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.bold,
    },
  });
