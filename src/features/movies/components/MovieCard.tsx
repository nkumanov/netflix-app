import { useTheme } from "../../../shared/hooks/useTheme";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { theme, type ThemeColors } from "../../../shared/styles";
import { memo, useState } from "react";
import { useAppNavigation } from "../../../shared/hooks/useAppNavigation";
type MovieCardProps = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};
const MovieCard = ({ Title, Year, Poster, imdbID }: MovieCardProps) => {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const [failedPoster, setFailedPoster] = useState<string | null>(null);
  const imageFailed = !Poster || Poster === "N/A" || failedPoster === Poster;

  const navigation = useAppNavigation();

  const handleNavigateToMovieDetails = () => {
    navigation.navigate("MovieDetails", { id: imdbID });
  };

  return (
    <Pressable style={styles.card} onPress={handleNavigateToMovieDetails}>
      {imageFailed && (
        <View style={[styles.poster, styles.posterFallback]}>
          <Text style={styles.fallbackText}>{Title}</Text>
        </View>
      )}
      {!imageFailed && (
        <Image
          alt="Image not found"
          style={styles.poster}
          srcSet={Poster}
          resizeMode="cover"
          accessibilityLabel={`${Title} poster`}
          onError={({ nativeEvent }) => {
            setFailedPoster(Poster);
          }}
        />
      )}
      <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
        {Title}
      </Text>
      <Text style={styles.year}>{Year}</Text>
    </Pressable>
  );
};

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    card: {
      width: 150,
      marginRight: theme.spacing.md,
      paddingBottom: theme.spacing.sm,
    },
    poster: {
      width: "100%",
      aspectRatio: 2 / 3,
      borderRadius: theme.radius.md,
      backgroundColor: colors.card.placeholder,
      borderWidth: 1,
      borderColor: colors.card.border,
    },
    title: {
      color: colors.card.title,
      fontSize: theme.fontSize.sm,
      fontWeight: theme.fontWeight.semiBold,
      lineHeight: 20,
      minHeight: 40,
      marginTop: theme.spacing.sm,
    },
    year: {
      color: colors.card.metadata,
      fontSize: theme.fontSize.xs,
      lineHeight: 18,
      marginTop: theme.spacing.xs,
    },
    posterFallback: {
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing.md,
      backgroundColor: colors.card.placeholder,
    },
    fallbackText: {
      color: colors.card.metadata,
      fontSize: theme.fontSize.sm,
      fontWeight: theme.fontWeight.medium,
      lineHeight: 20,
      textAlign: "center",
    },
  });

export default memo(MovieCard);
