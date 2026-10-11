import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import { useGetMovieByIdQuery } from "../features/movies/api/movieApi";
import type { RootStackParamList } from "../navigation/RootNavigator";
import Error from "../shared/components/Error";
import Loading from "../shared/components/Loading";
import PageWrapper from "../shared/components/PageWrapper";
import { useTheme } from "../shared/hooks/useTheme";
import { theme, type ThemeColors } from "../shared/styles";

import MovieOverview from "../features/movies/components/MovieOverview";
import MovieCredits from "../features/movies/components/MovieCredits";
import { available } from "../shared/utils/available";

export default function MovieDetailsScreen({
  route,
}: NativeStackScreenProps<RootStackParamList, "MovieDetails">) {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  const {
    data: movie,
    isLoading,
    isError,
    refetch,
  } = useGetMovieByIdQuery(route.params.id);

  if (isLoading) {
    return (
      <PageWrapper>
        <Loading />
      </PageWrapper>
    );
  }
  if (isError || !movie) {
    return (
      <PageWrapper>
        <Error
          onActionClick={refetch}
          btnTitle="Try again"
          title="Unable to load movie details"
          subTitle="Please try again in a moment."
        />
      </PageWrapper>
    );
  }

  const genres = available(movie.Genre) ? movie.Genre.split(", ") : [];

  return (
    <PageWrapper
      safeAreaViewProps={{ edges: ["left", "right", "bottom"] }}
      withScroll
      scrollViewProps={{
        contentContainerStyle: styles.content,
        showsVerticalScrollIndicator: false,
      }}
    >
      <MovieOverview movie={movie} />
      {genres.length > 0 && (
        <View style={styles.genres}>
          {genres.map((genre) => (
            <View key={genre} style={styles.chip}>
              <Text style={styles.chipText}>{genre}</Text>
            </View>
          ))}
        </View>
      )}
      {available(movie.Plot) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>The story</Text>
          <Text style={styles.plot}>{movie.Plot}</Text>
        </View>
      )}
      <MovieCredits movie={movie} />
    </PageWrapper>
  );
}

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    content: {
      padding: theme.spacing.xl,
      paddingBottom: theme.spacing.xxl,
      gap: theme.spacing.xl,
    },
    genres: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: theme.spacing.sm,
    },
    chip: {
      borderWidth: 1,
      borderColor: colors.container.border,
      borderRadius: theme.radius.full,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs,
    },
    chipText: { color: colors.text.secondary, fontSize: theme.fontSize.xs },
    section: { gap: theme.spacing.md },
    sectionTitle: {
      color: colors.text.primary,
      fontSize: theme.fontSize.lg,
      fontWeight: theme.fontWeight.semiBold,
    },
    plot: {
      color: colors.text.secondary,
      fontSize: theme.fontSize.md,
      lineHeight: 26,
    },
  });
