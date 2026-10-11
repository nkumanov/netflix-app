import { useTheme } from "../../../shared/hooks/useTheme";
import { memo, useCallback, useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  type ListRenderItemInfo,
} from "react-native";
import { theme, type ThemeColors } from "../../../shared/styles";
import { useGetInfiniteMoviesInfiniteQuery } from "../api/movieApi";
import type { Movie } from "../types/movies";
import MovieCard from "./MovieCard";
import Loading from "../../../shared/components/Loading";
type MovieCategoryProps = {
  search: string;
};

const renderMovieItem = ({ item }: ListRenderItemInfo<Movie>) => (
  <MovieCard {...item} />
);

const movieKeyExtractor = (item: Movie) => item.imdbID;

type MovieCategoryEmptyStateProps = {
  isFetching: boolean;
  hasError: boolean;
};

function MovieCategoryEmptyState({
  isFetching,
  hasError,
}: MovieCategoryEmptyStateProps) {
  const { colors } = useTheme();
  const styles = getStyles(colors);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>
        {hasError ? "Unable to load movies" : "No movies found"}
      </Text>
      <Text style={styles.emptyDescription}>
        {hasError
          ? "Please try again later."
          : "No movies available for this category."}
      </Text>
    </View>
  );
}

const MovieCategory = ({ search }: MovieCategoryProps) => {
  const { data, isFetching, error, hasNextPage, fetchNextPage } =
    useGetInfiniteMoviesInfiniteQuery({ category: search });

  const movies = useMemo(() => {
    return data?.pages.flatMap((page) => page.Search ?? []) ?? [];
  }, [data]);

  const handleEndReached = useCallback(() => {
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetching, fetchNextPage]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={movies}
      ListEmptyComponent={
        <MovieCategoryEmptyState
          isFetching={isFetching}
          hasError={Boolean(error)}
        />
      }
      renderItem={renderMovieItem}
      keyExtractor={movieKeyExtractor}
      onEndReachedThreshold={0.5}
      onEndReached={handleEndReached}
      initialNumToRender={3}
    />
  );
};

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    emptyState: {
      width: 280,
      minHeight: 180,
      alignItems: "center",
      justifyContent: "center",
      padding: theme.spacing.xl,
      backgroundColor: colors.container.surface,
      borderRadius: theme.radius.md,
      borderWidth: 1,
      borderColor: colors.container.border,
      marginBottom: theme.spacing.md,
    },
    emptyTitle: {
      color: colors.text.primary,
      fontSize: theme.fontSize.md,
      fontWeight: theme.fontWeight.semiBold,
      textAlign: "center",
    },
    emptyDescription: {
      color: colors.text.secondary,
      fontSize: theme.fontSize.sm,
      lineHeight: 20,
      textAlign: "center",
      marginTop: theme.spacing.sm,
    },
  });

export default memo(MovieCategory);
