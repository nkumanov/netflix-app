import { SectionList, StyleSheet, Text, View } from "react-native";
import { sections } from "../constants/categories";
import MovieCategory from "../features/movies/components/MovieCategory";
import PageWrapper from "../shared/components/PageWrapper";
import { useTheme } from "../shared/hooks/useTheme";
import { theme, type ThemeColors } from "../shared/styles";

type MovieSection = (typeof sections)[number];
type MovieCategoryItem = MovieSection["data"][number];

const categoryKeyExtractor = (item: MovieCategoryItem) => item.id;

const renderCategoryItem = ({ item }: { item: MovieCategoryItem }) => (
  <MovieCategory search={item.search} />
);

function CategorySectionHeader({ title }: { title: string }) {
  const { colors } = useTheme();
  const styles = getSectionHeaderStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const renderCategorySectionHeader = ({
  section,
}: {
  section: MovieSection;
}) => <CategorySectionHeader title={section.title} />;

export function HomeScreen() {
  const { colors } = useTheme();
  const styles = getStyles(colors);
  return (
    <PageWrapper
      safeAreaViewProps={{ style: { paddingHorizontal: theme.spacing.lg } }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>NETFLIX</Text>
        <Text style={styles.subtitle}>
          Your next favorite movie starts here.
        </Text>

        <SectionList
          stickyHeaderHiddenOnScroll
          showsVerticalScrollIndicator={false}
          sections={sections}
          keyExtractor={categoryKeyExtractor}
          renderSectionHeader={renderCategorySectionHeader}
          renderItem={renderCategoryItem}
        />
      </View>
    </PageWrapper>
  );
}

const getStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.container.screen,
    },
    title: {
      color: colors.brand.primary,
      fontSize: theme.fontSize.xxl,
      fontWeight: theme.fontWeight.bold,
      letterSpacing: 3,
    },
    subtitle: {
      color: colors.text.secondary,
      fontSize: theme.fontSize.md,
      marginTop: theme.spacing.md,
      textAlign: "center",
      marginBottom: theme.spacing.lg,
    },
  });

const getSectionHeaderStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.container.screen,
    },
    title: {
      color: colors.text.primary,
      fontSize: theme.fontSize.xl,
      marginBottom: theme.spacing.sm,
    },
  });
